import { createFolder, getChildren, getGroupFolders } from "../bll/schema/bll";
import {
  CreateFolderScheme,
  GetChildrenSchema,
  GetGroupFoldersSchema,
} from "../bll/schema/types";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const schemaRouter = createTRPCRouter({
  createFolder: protectedProcedure
    .input(CreateFolderScheme.omit({ userId: true }))
    .mutation(({ input, ctx }) =>
      createFolder({ ...input, userId: ctx.session.user.id }),
    ),
  getGroupFolders: protectedProcedure
    .input(GetGroupFoldersSchema.omit({ userId: true }))
    .query(({ input, ctx }) =>
      getGroupFolders({ ...input, userId: ctx.session.user.id }),
    ),
  getChildren: protectedProcedure
    .input(GetChildrenSchema.omit({ userId: true }))
    .query(({ input, ctx }) =>
      getChildren({ ...input, userId: ctx.session.user.id }),
    ),
});
