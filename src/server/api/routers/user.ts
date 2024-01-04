import { z } from "zod";
import { createGroup } from "../bll";
import { CreateGroupSchema } from "../bll/group/types";
import { getUserPrimaryGroup } from "../bll/user/bll";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getUserPrimaryGroup: protectedProcedure
    .input(z.string())
    .query(({ input }) => getUserPrimaryGroup(input)),

  createGroup: protectedProcedure
    .input(CreateGroupSchema.omit({ creator: true }))
    .mutation(({ input, ctx }) => {
      return createGroup({ ...input, creator: ctx.session.user.id });
    }),
});
