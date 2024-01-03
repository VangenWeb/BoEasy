import { prisma } from "~/server/db";

export async function userHasBasicAccessToGroup(
  userId: string,
  groupId: string,
) {
  const group = await prisma.group.findFirst({
    where: {
      id: groupId,
      users: {
        some: {
          id: userId,
        },
      },
    },
  });

  if (group) {
    return true;
  }

  return false;
}
