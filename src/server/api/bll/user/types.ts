import { z } from "zod";

export const GetUserGroupTasksSchema = z.object({
  groupId: z.string(),
  userId: z.string(),
  period: z.string().optional(),
});

export type GetUserGroupTasksInput = z.infer<typeof GetUserGroupTasksSchema>;
