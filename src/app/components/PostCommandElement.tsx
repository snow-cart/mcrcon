"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export function PostCommandElement() {
  const router = useRouter();
  const [command, setCommand] = useState("");

  const postCmd = api.rcon.postCmd.useMutation({
    onSuccess: () => {
      router.refresh();
      setCommand("");
    },
	onError: (error)  => {
	  console.log(error);
	  router.refresh();
	  setCommand("error");
	}
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        postCmd.mutate({ command });
      }}
      className="w-min h-min flex flex-row gap-0 rounded-full bg-white"
    >
      <input
        type="text"
        placeholder="say Hello, World!"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        className="w-full min-w-96  px-4 py-2 text-black bg-transparent"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-5 py-3 my-1 mr-1 font-semibold transition hover:bg-black/80 bg-black"
        disabled={postCmd.isPending}
      >
        {postCmd.isPending ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
