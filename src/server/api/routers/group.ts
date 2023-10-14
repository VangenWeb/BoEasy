import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { createGroup, createPrimaryGroup, getUserGroups } from "../bll";
import { CreateGroupSchema } from "../bll/group/types";

export const groupRouter = createTRPCRouter({
  getUserGroups: protectedProcedure
    .input(z.string())
    .query(({ input }) => getUserGroups(input)),

  createGroup: protectedProcedure
    .input(CreateGroupSchema.omit({ creator: true }))
    .mutation(({ input, ctx }) => {
      //Todo premium limitations? Doubtful but remember, it can be done ;).
      return createGroup({ ...input, creator: ctx.session.user.id });
    }),

  createPrimaryGroup: protectedProcedure
    .input(CreateGroupSchema.omit({ creator: true }))
    .mutation(({ input, ctx }) => {
      //Todo premium limitations? Doubtful but remember, it can be done ;).
      return createPrimaryGroup({ ...input, creator: ctx.session.user.id });
    }),
});
