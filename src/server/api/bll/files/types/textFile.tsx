import { z } from "zod";

export const CreateTextFileSchema = z.object({
  parentFolderId: z.string(),
  groupId: z.string(),
  createdById: z.string(),

  name: z.string(),
  content: z.string(),
});

export type CreateTextFileInput = z.infer<typeof CreateTextFileSchema>;
