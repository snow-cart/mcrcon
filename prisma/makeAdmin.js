
import { PrismaClient } from "@prisma/client";

import { env } from "../src/env";

const createPrismaClient = () =>
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

const globalForPrisma = globalThis;
if (typeof globalForPrisma.prisma === 'undefined') {
  globalForPrisma.prisma = createPrismaClient();
}


export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;


let userId = process.argv[0];
let adminStatus = process.argv[1] ? Boolean(process.argv[1]) : true;

await db.user.update({
      where: {
        id: userId,
      },
      data: {
        isAdmin: adminStatus,
      },
    });
