import { getServerAuthSession } from "../../server/auth";
import { getAdminStatus } from "../../util";
import { api } from "~/trpc/server";

import { PostCommandElement, Unauthorised } from ".";

export async function Console() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;
  return (
    <div className="w-full h-full">
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
	<div className="bg-gray-900 rounded-lg p-4 shadow-lg h-[80vh] overflow-y-scroll">
		<div className="whitespace-pre-wrap text-white">
			{logs ? logs : "Loading logs..."}
		</div>
	</div>
  );
}
