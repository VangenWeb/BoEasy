import { prisma } from "~/server/db";

export async function userHasAdminAccess(userId: string, groupId: string) {
  const group = await prisma.group.findFirst({
    where: {
      id: groupId,
      OR: [
        { ownerId: userId },
        {
          admins: {
            some: {
              id: userId,
            },
          },
        },
      ],
    },
    select: {
      ownerId: true,
      admins: true,
    },
  });

  if (group) {
    return true;
  }

  return false;
}
