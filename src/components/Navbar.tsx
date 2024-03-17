"use client";

import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="mb-4">
      <a className={`mr-4 ${pathname === "/" ? "border-b" : ""}`} href="/">
        🏴‍☠️ Chat
      </a>
      <a
        className={`mr-4 ${
          pathname === "/structured_output" ? "border-b" : ""
        }`}
        href="/structured_output"
      >
        🧱 Structured Output
      </a>
      <a
        className={`mr-4 ${pathname === "/agents" ? "border-b" : ""}`}
        href="/agents"
      >
        🦜 Agents
      </a>
      <a
        className={`mr-4 ${pathname === "/retrieval" ? "border-b" : ""}`}
        href="/retrieval"
      >
        🐶 Retrieval
      </a>
      <a
        className={`mr-4 ${pathname === "/retrieval_agents" ? "border-b" : ""}`}
        href="/retrieval_agents"
      >
        🤖 Retrieval Agents
      </a>
    </nav>
  );
}
