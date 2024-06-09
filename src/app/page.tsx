import Link from "next/link";

import { PostCommandElement } from "./components";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { getAdminStatus } from "../util";
import { env } from "../env";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-top bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl text-white">
              {session && <>
			  	<span> Logged in as {session.user?.name}</span>  <br/>
				{//if (env.NODE_ENV == "development" || env.NODE_ENV == "test") 
					<span className="text-xs">UserId: {session.user?.id}</span>}
			  </>}
            </p>
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
          </div>
        </div>

        <Console />
      </div>
    </main>
  );
}

async function Console() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  let logs: string | undefined = "Loading logs...";
  logs = await api.rcon.getLogs();

  return (
    <div className="w-full max-w-xs">
            {
			await getAdminStatus( session?.user.id ? session?.user.id : "" )
				? <>
					{logs ? logs : "Loading logs..."} 
					<PostCommandElement />
				  </>
				: Unauthorised()
			}
      
    </div>
  );
}

function Unauthorised () {
	return (
		<div role="alert" className="alert alert-error">
 			<svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
 		 	<span>Unauthorised! Contact your admin for permissions</span>
		</div>
	);
}
