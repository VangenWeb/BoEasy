import { Prisma } from "@prisma/client";
import { z } from "zod";

export const FieldTypeSchema = z.enum(["text", "checkbox", "number", "title"]);

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

export const GetSchemaSchema = z.object({
  schemaId: z.string(),
  userId: z.string(),
});

export const TextFieldSchema = z.object({
  id: z.string(),
  type: z.literal("text"),
  name: z.string(),
  answer: z.string(),
});

export const CheckboxFieldSchema = z.object({
  id: z.string(),
  type: z.literal("checkbox"),
  name: z.string(),
  answer: z.boolean(),
});

export const TitleFieldSchema = z.object({
  id: z.string(),
  type: z.literal("title"),
  name: z.string(),
});

export const SchemaDataFieldSchema = z.discriminatedUnion("type", [
  TextFieldSchema,
  CheckboxFieldSchema,
  TitleFieldSchema,
]);

export const SchemaDataSchema = z.object({
  schemaId: z.string(),
  schemaDataId: z.string().optional(),
  fields: z.array(SchemaDataFieldSchema),
});

export const UpsertSchemaDataSchema = z.object({
  userId: z.string(),
  groupId: z.string(),
  schemaData: SchemaDataSchema,
  deliver: z.boolean(),
});

export const GetSchemaDataSchema = z.object({
  userId: z.string(),
  schemaDataId: z.string(),
});

export type CreateSchemaSchemaInput = z.infer<typeof CreateSchemaSchema>;
export type GetSchemaInput = z.infer<typeof GetSchemaSchema>;
export type UpsertSchemaDataInput = z.infer<typeof UpsertSchemaDataSchema>;
export type GetSchemaDataInput = z.infer<typeof GetSchemaDataSchema>;

export type SchemaDataFieldObject = z.infer<typeof SchemaDataFieldSchema>;
export type SchemaDataObject = z.infer<typeof SchemaDataSchema>;

export type SchemaWithSchemaData = Prisma.SchemaGetPayload<{
  include: {
    data: {
      include: {
        createdBy: true;
      };
    };
  };
}>;

export type SchemaDataWithUser = Prisma.SchemaDataGetPayload<{
  include: {
    createdBy: true;
  };
}>;

export type GetSchemaDataReturn = Prisma.SchemaDataGetPayload<{
  include: {
    createdBy: true;
    schema: true;
  };
}>;
