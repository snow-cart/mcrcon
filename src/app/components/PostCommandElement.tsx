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
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="say Hello, World!"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black bg-white"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={postCmd.isPending}
      >
        {postCmd.isPending ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
