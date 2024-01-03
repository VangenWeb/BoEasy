import { type SchemaFolder } from "@prisma/client";
import { z } from "zod";

export const CreateFolderScheme = z.object({
  name: z.string(),
  groupId: z.string(),
  userId: z.string(),
  parentId: z.string().optional().nullable(),
});

export const GetGroupFoldersSchema = z.object({
  groupId: z.string(),
  parentId: z.string().nullable(),
  userId: z.string(),
});

export const GetGroupSchemasSchema = z.object({
  groupId: z.string(),
  parentId: z.string().nullable(),
  userId: z.string(),
});

export const GetChildrenSchema = z.object({
  groupId: z.string(),
  parentId: z.string().nullable(),
  userId: z.string(),
});

export type CreateFolderInput = z.infer<typeof CreateFolderScheme>;
export type GetGroupFoldersInput = z.infer<typeof GetGroupFoldersSchema>;
export type GetGroupSchemasInput = z.infer<typeof GetGroupSchemasSchema>;
export type GetChildrenInput = z.infer<typeof GetChildrenSchema>;
