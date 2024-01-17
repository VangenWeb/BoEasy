import { type Prisma } from "@prisma/client";
import { z } from "zod";

export const CreateTextFileSchema = z.object({
  parentFolderId: z.string(),
  groupId: z.string(),
  createdById: z.string(),

  name: z.string(),
  content: z.string(),
});

export const UpdateTextFileSchema = z.object({
  id: z.string(),
  userId: z.string(),

  name: z.string(),
  content: z.string(),
});

export const GetTextFileSchema = z.object({
  id: z.string(),
  userId: z.string(),
});

export type CreateTextFileInput = z.infer<typeof CreateTextFileSchema>;
export type GetTextFileInput = z.infer<typeof GetTextFileSchema>;
export type UpdateTextFileInput = z.infer<typeof UpdateTextFileSchema>;

export type GetTextFileReturn = Prisma.TextFileGetPayload<null> & {
  canEdit: boolean;
};
