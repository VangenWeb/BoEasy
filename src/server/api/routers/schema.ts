import {
  createFolder,
  createSchema,
  getChildren,
  getGroupFolders,
  getSchema,
  getSchemaData,
  getSchemaWithSchemaData,
  upsertSchemaData,
} from "../bll/schema/bll";
import {
  CreateSchemaSchema,
  GetSchemaDataSchema,
  GetSchemaSchema,
  UpsertSchemaDataSchema,
} from "../bll/schema/types/schema";
import {
  CreateFolderScheme,
  GetChildrenSchema,
  GetGroupFoldersSchema,
} from "../bll/schema/types/folder";
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
  upsertSchemaData: protectedProcedure
    .input(UpsertSchemaDataSchema.omit({ userId: true }))
    .mutation(({ input, ctx }) =>
      upsertSchemaData({ ...input, userId: ctx.session.user.id }),
    ),
  getSchema: protectedProcedure
    .input(GetSchemaSchema.omit({ userId: true }))
    .query(({ input, ctx }) =>
      getSchema({ ...input, userId: ctx.session.user.id }),
    ),

  getSchemaWithSchemaData: protectedProcedure
    .input(GetSchemaSchema.omit({ userId: true }))
    .query(({ input, ctx }) =>
      getSchemaWithSchemaData({ ...input, userId: ctx.session.user.id }),
    ),
  getSchemaData: protectedProcedure
    .input(GetSchemaDataSchema.omit({ userId: true }))
    .query(({ input, ctx }) =>
      getSchemaData({ ...input, userId: ctx.session.user.id }),
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
