#!/usr/bin/env node
// @ts-nocheck

// START OF DB
	// makeshift copy of src/server/db.ts
	// but without types

import { PrismaClient } from "@prisma/client";

import { env } from "../src/env.js";

const createPrismaClient = () =>
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

const globalForPrisma = globalThis;
if (typeof globalForPrisma.prisma === 'undefined') {
  globalForPrisma.prisma = createPrismaClient();
}

const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;

//END OF DB

//START OF SCRIPT

let userId = ""; // due to unknown errors this is manual
let adminStatus = true;

await db.user.update({
      where: {
        id: userId,
      },
      data: {
        isAdmin: adminStatus,
      },
    });

//END OF SCRIPT
