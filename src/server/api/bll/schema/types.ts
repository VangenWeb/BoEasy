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

export const FieldTypeSchema = z.enum(["text", "checkbox", "number"]);

export const FieldsSchema = z.object({
  name: z.string(),
  type: FieldTypeSchema,
});

export const SchemaRecurrenceSchema = z.enum([
  "none",
  "monthly",
  "quarterly",
  "yearly",
]);
export const SchemaAudienceSchema = z.enum(["none", "group", "owner"]);
export const CreateSchemaSchema = z.object({
  groupId: z.string(),
  userId: z.string(),
  parentId: z.string().nullable(),

  name: z.string(),
  fields: z.array(FieldsSchema),
  recurrence: SchemaRecurrenceSchema,
  audience: SchemaAudienceSchema,
});

export type CreateFolderInput = z.infer<typeof CreateFolderScheme>;
export type GetGroupFoldersInput = z.infer<typeof GetGroupFoldersSchema>;
export type GetGroupSchemasInput = z.infer<typeof GetGroupSchemasSchema>;
export type GetChildrenInput = z.infer<typeof GetChildrenSchema>;
export type CreateSchemaSchemaInput = z.infer<typeof CreateSchemaSchema>;
