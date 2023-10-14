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

export async function getUserPrimaryGroupTasks(userId: string) {
  const tasks = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      primaryGroup: {
        select: {
          tasks: {
            where: {
              userId: userId,
            },
          },
        },
      },
    },
  });

  if (!tasks?.primaryGroup) {
    throw new Error("User's primary group tasks not found");
  }

  return tasks;
}

export async function getUserGroupTasks(input: GetUserGroupTasksInput) {
  const { groupId, userId, period } = input;

  const tasks = await prisma.group.findUnique({
    where: {
      id: groupId,
    },
    select: {
      tasks: {
        where: {
          userId: userId,
          periodically: period ?? null,
        },
      },
    },
  });

  if (!tasks) {
    throw new Error("User has no tasks in group");
  }

  return tasks.tasks;
}
