import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { Rcon } from "rcon-client";
const rcon = new Rcon({
  host: env.MC_HOST,
  port: Number(env.MC_RCON_PORT),
  password: env.MC_RCON_PASSWORD,
});

import { env } from "../../../env";

import { getHtml, getAdminStatus } from "../../../util";

export const rconRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  postCmd: protectedProcedure
    .input(z.object({ command: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      if (await getAdminStatus(ctx.session.user.id)) {
        await rcon.connect();
        await rcon.send(input.command);
        rcon.end();
      }
    }),

  getLogs: protectedProcedure.mutation(async ({ ctx }) => {
    if (await getAdminStatus(ctx.session.user.id))
      return await getHtml(env.MC_LOGS_PATH);
  }),
});
