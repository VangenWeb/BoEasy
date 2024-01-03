import { prisma } from "~/server/db";
import { GetUserGroupTasksInput } from "./types";

export async function getUserPrimaryGroup(userId: string) {
  const group = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      primaryGroup: true,
    },
  });

  if (!group) {
    throw new Error("User's primary group not found");
  }

  return {
    group: group.primaryGroup,
  };
}
