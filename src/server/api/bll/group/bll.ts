import { type Group } from "@prisma/client";
import { prisma } from "~/server/db";
import { userHasBasicAccessToGroup } from "../util/userHasBasicAccessToGroup";
import { type GetGroupInput, type CreateGroupInput } from "./types";
import { type AndyQuery } from "../types";

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
      ownerId: input.creator,
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

  await prisma.user.update({
    where: {
      id: input.creator,
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

export async function createPrimaryGroup(input: CreateGroupInput) {
  const { name, creator } = input;

  const group = await prisma.group.create({
    data: {
      name: name,
      ownerId: creator,
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

export async function getGroup({
  groupId,
  userId,
}: GetGroupInput): AndyQuery<Group> {
  if (!(await userHasBasicAccessToGroup(userId, groupId))) {
    return {
      ok: false,
      error: "User has no access to group",
    };
  }

  const group = await prisma.group.findUnique({
    where: {
      id: groupId,
    },
  });

  if (!group) {
    return {
      ok: false,
      error: "Group not found",
    };
  }

  return {
    ok: true,
    data: group,
  };
}
