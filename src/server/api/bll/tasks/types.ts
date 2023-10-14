import { z } from "zod";

export const CreateTaskScheme = z.object({
  userId: z.string(),
  groupId: z.string(),
  createdById: z.string(),

  name: z.string(),
  description: z.string().optional(),

  expires: z.date(),
  period: z.date().optional(),
  periodically: z.enum(["daily", "weekly", "monthly", "yearly"]).optional(),
});

export type CreateTaskInput = z.infer<typeof CreateTaskScheme>;

const PeriodicTaskPeriod = z.enum(["daily", "weekly", "monthly", "yearly"]);

export const CreatePeriodicTaskScheme = z.object({
  name: z.string(),
  description: z.string().optional(),
  repeats: PeriodicTaskPeriod,

  groupId: z.string(),
  userId: z.string(),
  createdById: z.string(),
});

export type CreatePeriodicTaskInput = z.infer<typeof CreatePeriodicTaskScheme>;
