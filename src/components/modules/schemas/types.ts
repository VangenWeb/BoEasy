import { type Prisma } from "@prisma/client";

export type SchemaWithFields = Prisma.SchemaGetPayload<{
  include: {
    fields: true;
  };
}>;
