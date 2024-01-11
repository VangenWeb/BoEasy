import { type Prisma, type Schema, type SchemaFolder } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { prisma } from "~/server/db";
import { type AndyQuery } from "../types";
import { userHasAdminAccess } from "../util/userHasAdminAcces";
import { userHasBasicAccessToGroup } from "../util/userHasBasicAccessToGroup";
import {
  type CreateFolderInput,
  type GetChildrenInput,
  type GetGroupFoldersInput,
} from "./types/folder";
import {
  SchemaDataSchema,
  type CreateSchemaSchemaInput,
  type GetSchemaDataInput,
  type GetSchemaDataReturn,
  type GetSchemaInput,
  type SchemaWithSchemaData,
  type UpsertSchemaDataInput,
} from "./types/schema";
import {
  type CreateTextFileInput,
  CreateTextFileSchema,
} from "./types/textFile";

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

export async function getSchema({
  schemaId,
  userId,
}: GetSchemaInput): AndyQuery<
  Prisma.SchemaGetPayload<{
    include: {
      fields: true;
    };
  }>
> {
  const schema = await prisma.schema.findUnique({
    where: {
      id: schemaId,
    },
    include: {
      fields: true,
    },
  });

  if (!schema) {
    return {
      ok: false,
      error: "Schema not found",
    };
  }

  const access = await userHasBasicAccessToGroup(userId, schema.groupId);

  if (!access) {
    return {
      ok: false,
      error: "User does not have access to group",
    };
  }

  return {
    ok: true,
    data: schema,
  };
}

export async function upsertSchemaData({
  schemaData,
  userId,
  groupId,
  deliver,
}: UpsertSchemaDataInput) {
  const access = await userHasBasicAccessToGroup(userId, groupId);

  if (!access) {
    return {
      ok: false,
      error: "User does not have access to group",
    };
  }

  const verifiedData = SchemaDataSchema.safeParse(schemaData);

  if (!verifiedData.success) {
    return {
      ok: false,
      error: verifiedData.error.message,
    };
  }

  if (!schemaData.schemaDataId) {
    const schema = await prisma.schemaData.create({
      data: {
        schemaId: schemaData.schemaId,
        createdById: userId,
        groupId: groupId,
        data: schemaData,
        delivered: deliver,
      },
    });

    if (!schema) {
      return {
        ok: false,
        error: "Schema not found",
      };
    }

    return {
      ok: true,
      data: {
        schemaDataId: schema.id,
      },
    };
  }

  const upsertedSchemaData = await prisma.schemaData.upsert({
    where: {
      id: schemaData.schemaDataId,
    },
    update: {
      data: JSON.stringify(schemaData),
    },
    create: {
      data: JSON.stringify(schemaData),
      schemaId: schemaData.schemaId,
      createdById: userId,
      groupId: groupId,
    },
  });

  if (!upsertedSchemaData) {
    return {
      ok: false,
      error: "Schema data not created",
    };
  }

  return {
    ok: true,
    data: {
      schemaDataId: upsertedSchemaData.id,
    },
  };
}

export async function getSchemaWithSchemaData({
  schemaId,
  userId,
}: GetSchemaInput): AndyQuery<SchemaWithSchemaData> {
  const schema = await prisma.schema.findUnique({
    where: {
      id: schemaId,
    },
    include: {
      data: {
        include: {
          createdBy: true,
        },
      },
    },
  });

  if (!schema) {
    return {
      ok: false,
      error: "Schema not found",
    };
  }

  const access = await userHasBasicAccessToGroup(userId, schema.groupId);

  if (!access) {
    return {
      ok: false,
      error: "User does not have access to group",
    };
  }

  return {
    ok: true,
    data: schema,
  };
}

export async function getSchemaData({
  schemaDataId,
  userId,
}: GetSchemaDataInput): AndyQuery<GetSchemaDataReturn> {
  const schema = await prisma.schemaData.findUnique({
    where: {
      id: schemaDataId,
    },
    include: {
      createdBy: true,
      schema: true,
    },
  });

  if (!schema) {
    return {
      ok: false,
      error: "Schema data not found",
    };
  }

  const access = await userHasBasicAccessToGroup(userId, schema.groupId);

  if (!access) {
    return {
      ok: false,
      error: "User does not have access to group",
    };
  }

  return {
    ok: true,
    data: schema,
  };
}

export async function createTextFile(
  textFile: CreateTextFileInput,
): AndyQuery<null> {
  const access = await userHasBasicAccessToGroup(
    textFile.createdById,
    textFile.groupId,
  );
  if (!access) {
    return { ok: false, error: "User does not have access to group" };
  }

  const verifiedData = CreateTextFileSchema.safeParse(textFile);

  if (!verifiedData.success) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: verifiedData.error.message,
    }); //return { ok: false, error: verifiedData.error.message };
  }

  const file = await prisma.textFile.create({
    data: {
      name: textFile.name,
      content: textFile.content,
      groupId: textFile.groupId,
      createdById: textFile.createdById,
    },
  });

  if (!file) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "File not created",
    });
  }

  return {
    ok: true,
    data: null,
  };
}
