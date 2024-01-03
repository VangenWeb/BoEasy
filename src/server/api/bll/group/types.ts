import { z } from "zod";

export const CreateGroupSchema = z.object({
  name: z.string(),
  creator: z.string(),
});

export const GetGroupSchema = z.object({
  groupId: z.string(),
  userId: z.string(),
});

export type CreateGroupInput = z.infer<typeof CreateGroupSchema>;
export type GetGroupInput = z.infer<typeof GetGroupSchema>;
// function that removes fields that could be filled by context
