import { prisma } from "~/server/db";
import { type CreatePeriodicTaskInput, type CreateTaskInput } from "./types";

export async function createTask(input: CreateTaskInput) {
  const task = await prisma.task.create({
    data: {
      ...input,
    },
  });

  if (!task) {
    throw new Error("Task not created");
  }
  return {
    ok: true,
  };
}

export async function createPeriodicTask(input: CreatePeriodicTaskInput) {
  const task = await prisma.periodicTask.create({
    data: {
      ...input,
    },
  });

  if (!task) {
    throw new Error("Task not created");
  }
}
