import { getServerAuthSession } from "~/server/auth";

import Link from "next/link";

export async function Header () {
	const session = await getServerAuthSession();

	return (
		<div className="flex flex-row bg-gray-800 text-white pl-5 pb-3 pr-2 pt-4 w-full">
			<div className="flex flex-row h-full self-center">
				{/* <img src={logoSrc} class="w-12 h-auto mr-2 rounded-full" alt="Logo"> */}
				<h1 className="m-0">mcrcon</h1>
			</div>
			<div className="ml-auto mr-1 flex flex-row">
              {session
				&& <div className="flex flex-col mr-4">
					<span> Logged in as {session.user?.name}</span>
					{//if (env.NODE_ENV == "development" || env.NODE_ENV == "test") 
						<span className="text-xs mt-0 ">UserId: {session.user?.id}</span>}
				</div>
			  }
			 <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
			</div>
			{/* <div>
				<NavLink text="Home" href="#home" />
				<NavLink text="About" href="#about" />
				<NavLink text="Contact" href="#contact" />
			</div> */}
        </div>
	);
}

export async function NavLink(text: string, href: string) {
	return (
		<a href={href} className="text-white no-underline mr-5 hover:underline">
			{text}
		</a>
	);
}
