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

  if (!group) {
    throw new Error("Group not created");
  }

  return group;
}

export async function createPrimaryGroup(input: CreateGroupInput) {
  const { name, creator } = input;

  const group = await prisma.group.create({
    data: {
      name: name,
      users: {
        connect: {
          id: creator,
        },
      },
    },
  });

  if (!group) {
    throw new Error("Group not created");
  }

  await prisma.user.update({
    where: {
      id: creator,
    },
    data: {
      primaryGroup: {
        connect: {
          id: group.id,
        },
      },
    },
  });

  return group;
}
