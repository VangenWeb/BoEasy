import { Schema, type SchemaFolder } from "@prisma/client";
import { prisma } from "~/server/db";
import { userHasAdminAccess } from "../util/userHasAdminAcces";
import {
  GetGroupFoldersSchema,
  type CreateFolderInput,
  GetGroupFoldersInput,
  GetChildrenInput,
} from "./types";
import { AndyQuery } from "../types";
import { userHasBasicAccessToGroup } from "../util/userHasBasicAccessToGroup";

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
