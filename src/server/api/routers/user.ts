import { z } from "zod";
import { createGroup } from "../bll";
import { CreateGroupSchema } from "../bll/group/types";
import {
  getUserGroupTasks,
  getUserPrimaryGroup,
  getUserPrimaryGroupTasks,
} from "../bll/user/bll";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { GetUserGroupTasksSchema } from "../bll/user/types";

export const userRouter = createTRPCRouter({
  getUserPrimaryGroup: protectedProcedure
    .input(z.string())
    .query(({ input }) => getUserPrimaryGroup(input)),

  createGroup: protectedProcedure
    .input(CreateGroupSchema.omit({ creator: true }))
    .mutation(({ input, ctx }) => {
      //Todo premium limitations? Doubtful but remember, it can be done ;).
      return createGroup({ ...input, creator: ctx.session.user.id });
    }),

  getUserPrimaryGroupTasks: protectedProcedure
    .input(z.string())
    .query(({ input }) => getUserPrimaryGroupTasks(input)),
  getUserGroupTasks: protectedProcedure
    .input(GetUserGroupTasksSchema)
    .query(({ input }) => {
      return getUserGroupTasks(input);
    }),
});
