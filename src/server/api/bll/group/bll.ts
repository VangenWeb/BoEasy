import { prisma } from "~/server/db";
import { type CreateGroupInput } from "./types";

export async function getUserGroups(userId: string) {
  const groups = await prisma.group.findMany({
    where: {
      users: {
        some: {
          id: userId,
        },
      },
    },
  });

  return groups;
}

export async function createGroup(input: CreateGroupInput) {
  const group = await prisma.group.create({
    data: {
      name: input.name,
      users: {
        connect: {
          id: input.creator,
        },
      },
    },
  });

  return group;
}
