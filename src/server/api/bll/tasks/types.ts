import { z } from "zod";

export const CreateTaskScheme = z.object({
  name: z.string(),
  description: z.string().optional(),
  expires: z.date(),
  groupId: z.string(),
  userId: z.string(),
  createdById: z.string(),
});

export type CreateTaskInput = z.infer<typeof CreateTaskScheme>;

const PeriodicTaskPeriod = z.enum(["day", "week", "month", "year"]);
export const CreatePeriodicTaskScheme = z.object({
  name: z.string(),
  description: z.string().optional(),
  repeats: PeriodicTaskPeriod,

  groupId: z.string(),
  userId: z.string(),
  createdById: z.string(),
});

export type CreatePeriodicTaskInput = z.infer<typeof CreatePeriodicTaskScheme>;
