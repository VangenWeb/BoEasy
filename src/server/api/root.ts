import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { groupRouter } from "./routers/group";
import { userRouter } from "./routers/user";
import { filesRouter } from "./routers/files";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  group: groupRouter,
  user: userRouter,
  schema: filesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
