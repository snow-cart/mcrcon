import { useState } from "react";

import { getServerAuthSession } from "../../server/auth";
import { getAdminStatus } from "../../util";
import { api } from "~/trpc/server";

import { PostCommandElement, Unauthorised } from ".";

export async function Console() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;
  return (
    <div className="w-full">
            {await getAdminStatus( session?.user.id ? session?.user.id : "" )
				? <>
					<Logs />
					<div className="h-3"/>
					<PostCommandElement />
				  </>
				: <Unauthorised />}
    </div>
  );
}

export async function Logs () {
  let logs: string | undefined = "Loading logs...";
  logs = await api.rcon.getLogs();
  console.log(logs);
  setTimeout(fetchLogs, 1000);
  async function fetchLogs() {
	logs = await api.rcon.getLogs();
  }
  return (
  	<div className="w-full whitespace-pre-wrap">
		{logs ? logs : "Loading logs..."}
	</div>
  );
}
