import { prisma } from "~/server/db";

export async function userHasAdminAccess(userId: string, groupId: string) {
  const group = await prisma.group.findUnique({
    where: {
      id: groupId,
    },
    select: {
      ownerId: true,
      admins: true,
    },
  });

  if (userId === group?.ownerId) {
    return true;
  }

  if (group?.admins.some((user) => user.id === userId)) {
    return true;
  }

  return false;
}
