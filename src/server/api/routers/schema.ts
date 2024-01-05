import {
  createFolder,
  createSchema,
  getChildren,
  getGroupFolders,
  getSchema,
} from "../bll/schema/bll";
import {
  CreateFolderScheme,
  CreateSchemaSchema,
  GetChildrenSchema,
  GetGroupFoldersSchema,
  GetSchemaSchema,
} from "../bll/schema/types";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const schemaRouter = createTRPCRouter({
  createFolder: protectedProcedure
    .input(CreateFolderScheme.omit({ userId: true }))
    .mutation(({ input, ctx }) =>
      createFolder({ ...input, userId: ctx.session.user.id }),
    ),
  createSchema: protectedProcedure
    .input(CreateSchemaSchema.omit({ userId: true }))
    .mutation(({ input, ctx }) =>
      createSchema({ ...input, userId: ctx.session.user.id }),
    ),
  getSchema: protectedProcedure
    .input(GetSchemaSchema.omit({ userId: true }))
    .query(({ input, ctx }) =>
      getSchema({ ...input, userId: ctx.session.user.id }),
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
