import { createPeriodicTask, createTask } from "../bll/tasks/bll";
import { CreatePeriodicTaskScheme, CreateTaskScheme } from "../bll/tasks/types";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const taskRouter = createTRPCRouter({
  createTask: protectedProcedure
    .input(CreateTaskScheme.omit({ createdById: true }))
    .mutation(({ input, ctx }) => {
      return createTask({ ...input, createdById: ctx.session.user.id });
    }),
  createPeriodicTask: protectedProcedure
    .input(CreatePeriodicTaskScheme.omit({ createdById: true }))
    .mutation(({ input, ctx }) => {
      return createPeriodicTask({ ...input, createdById: ctx.session.user.id });
    }),
});
