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
  const colorClassName =
    message.role === "user" ? "bg-sky-600" : "bg-slate-50 text-black";
  const alignmentClassName = message.role === "user" ? "ml-auto" : "mr-auto";
  const prefix = message.role === "user" ? "🧑" : aiEmoji;
  return (
    <div
      className={`${alignmentClassName} ${colorClassName} rounded px-4 py-2 max-w-[80%] mb-8 flex`}
    >
      <div className="mr-2">{prefix}</div>
      <div className="flex flex-col whitespace-pre-wrap">
        <span>{message.content}</span>
        {sources && sources.length ? (
          <>
            <code className="px-2 py-1 mt-4 mr-auto rounded bg-slate-600">
              <h2>🔍 Sources:</h2>
            </code>
            <code className="px-2 py-1 mt-1 mr-2 text-xs rounded bg-slate-600">
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
