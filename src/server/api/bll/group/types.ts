import { z } from "zod";

export const CreateGroupSchema = z.object({
  name: z.string(),
  creator: z.string(),
});

export type CreateGroupInput = z.infer<typeof CreateGroupSchema>;

// function that removes fields that could be filled by context
