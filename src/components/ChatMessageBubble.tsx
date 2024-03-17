import { cn } from "@/lib/utils";
import type { Message } from "ai/react";

export function ChatMessageBubble({
  message,
  aiEmoji,
  sources,
  search,
}: {
  message: Message;
  aiEmoji?: string;
  sources: any[];
  search?: string | null;
}) {
  const prefix = message.role === "user" ? "🧑" : aiEmoji;
  return (
    <div
      className={cn("max-w-[80%] mb-8 flex", {
        "ml-auto": message.role === "user",
        "mr-auto": message.role !== "user",
      })}
    >
      <div className="flex items-center justify-center mr-2 text-xl border rounded-full bg-background size-9 shrink-0">
        {prefix}
      </div>
      <div
        className={cn("flex flex-col whitespace-pre-wrap px-4 py-2 rounded", {
          "bg-blue-200 text-blue-950": message.role === "user",
          "bg-muted": message.role !== "user",
        })}
      >
        <span>{message.content}</span>
        {sources && sources.length ? (
          <>
            <code className="px-2 py-1 mt-4 mr-auto rounded bg-slate-600">
              <h2>🔍 Sources:</h2>
            </code>
            <code className="px-2 py-1 mt-1 text-xs rounded bg-slate-600">
              {sources?.map((source, i) => (
                <div className="mt-2" key={"source:" + i}>
                  {i + 1}. &quot;{source.pageContent}&quot;
                  {source.metadata?.loc?.lines !== undefined ? (
                    <div>
                      <br />
                      Lines {source.metadata?.loc?.lines?.from} to{" "}
                      {source.metadata?.loc?.lines?.to}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </code>
          </>
        ) : (
          ""
        )}
        {search && message.role !== "user" ? (
          <>
            <code className="px-2 py-1 mt-4 mr-auto rounded bg-slate-600">
              <h2>🔍 Search:</h2>
            </code>
            <code className="px-2 py-1 mt-1 mr-2 text-xs rounded bg-slate-600">
              <div className="mt-2">&quot;{search}&quot;</div>
            </code>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
