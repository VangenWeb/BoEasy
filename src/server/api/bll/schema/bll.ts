import { type Schema, type SchemaFolder } from "@prisma/client";
import { prisma } from "~/server/db";
import { type AndyQuery } from "../types";
import { userHasAdminAccess } from "../util/userHasAdminAcces";
import { userHasBasicAccessToGroup } from "../util/userHasBasicAccessToGroup";
import {
  type CreateSchemaSchemaInput,
  type GetChildrenInput,
  type GetGroupFoldersInput,
  type CreateFolderInput,
} from "./types";

export async function createFolder(input: CreateFolderInput) {
  if (!(await userHasAdminAccess(input.userId, input.groupId))) {
    throw new Error("User has no access to create folder");
  }

  const folder = await prisma.schemaFolder.create({
    data: {
      name: input.name,
      parentId: input?.parentId ?? null,
      groupId: input.groupId,
    },
  });

  if (!folder) {
    return {
      ok: false,
      error: "Folder not created",
    };
  }

  return {
    ok: true,
    folder,
  };
}

export async function getGroupFolders(
  input: GetGroupFoldersInput,
): AndyQuery<SchemaFolder[]> {
  const { groupId, parentId, userId } = input;

  if (!(await userHasBasicAccessToGroup(userId, groupId))) {
    return {
      ok: false,
      error: "User has no access to group",
    };
  }

  const folders = await prisma.schemaFolder.findMany({
    where: {
      groupId: groupId,
      parentId: parentId,
    },
  });

  if (!folders) {
    return {
      ok: false,
      error: "Folders not found",
    };
  }

  return {
    ok: true,
    data: folders,
  };
}

export async function getGroupSchemas({
  groupId,
  parentId,
  userId,
}: GetGroupFoldersInput): AndyQuery<Schema[]> {
  if (!(await userHasBasicAccessToGroup(userId, groupId))) {
    return {
      ok: false,
      error: "User has no access to group",
    };
  }

  const folders = await prisma.schema.findMany({
    where: {
      groupId: groupId,
      parentFolderId: parentId,
    },
  });

  if (!folders) {
    return {
      ok: false,
      error: "Folders not found",
    };
  }

  return {
    ok: true,
    data: folders,
  };
}

export async function getChildren({
  groupId,
  parentId,
  userId,
}: GetChildrenInput): AndyQuery<{
  folders: SchemaFolder[];
  schemas: Schema[];
}> {
  if (!(await userHasBasicAccessToGroup(userId, groupId))) {
    return {
      ok: false,
      error: "User has no access to group",
    };
  }

  const folders = await prisma.schemaFolder.findMany({
    where: {
      parentId: parentId,
      groupId: groupId,
    },
  });

  const schemas = await prisma.schema.findMany({
    where: {
      parentFolderId: parentId,
      groupId: groupId,
    },
  });

  return {
    ok: true,
    data: {
      folders,
      schemas,
    },
  };
}

export async function createSchema(input: CreateSchemaSchemaInput) {
  if (!(await userHasAdminAccess(input.userId, input.groupId))) {
    return {
      ok: false,
      error: "User does not have admin access to group",
    };
  }

  const schema = await prisma.schema.create({
    data: {
      name: input.name,
      parentFolderId: input.parentId,
      groupId: input.groupId,
      recurrence: input.recurrence,
      audience: input.audience,
    },
  });

  if (!schema) {
    return {
      ok: false,
      error: "Schema not created",
    };
  }
  const fieldsInput = input.fields.map((field) => ({
    name: field.name,
    type: field.type,
    schemaId: schema.id,
  }));

  const fields = await prisma.field.createMany({
    data: fieldsInput,
  });

  if (!fields) {
    return {
      ok: false,
      error: "Fields not created",
    };
  }

  return {
    ok: true,
    schema,
  };
}
