"use client";

import { useChat } from "ai/react";
import { useState } from "react";
import type { FormEvent } from "react";

import { ChatMessageBubble } from "@//components/ChatMessageBubble";
import { IntermediateStep } from "./IntermediateStep";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { ModelSelector } from "./layout/model-selector";
import { TemperatureSelector } from "./layout/temperature-selector";
import { MaxLengthSelector } from "./layout/maxlength-selector";
import { TopPSelector } from "./layout/top-p-selector";
import { Model, models, types } from "@/data/models";

export function ChatWindow(props: {
  endpoint: string;
  placeholder?: string;
  titleText?: string;
  emoji?: string;
}) {
  const { endpoint, placeholder, titleText = "An LLM", emoji } = props;

  const [sourcesForMessages, setSourcesForMessages] = useState<
    Record<string, any>
  >({});
  const [searchForMessages, setSearchForMessages] = useState<string | null>();
  const [temperature, setTemperature] = useState<number[]>([0.2]);
  const [maxTokens, setMaxTokens] = useState<number[]>([3000]);
  const [topP, setTopP] = useState<number[]>([0.5]);
  const [model, setModel] = useState<Model>(models[0]);

  const {
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading: chatEndpointIsLoading,
    setMessages,
  } = useChat({
    api: endpoint,
    body: {
      temperature: temperature[0],
      maxTokens: maxTokens[0],
      topP: topP[0],
      modelName: model.name,
    },
    onResponse(response) {
      const searchHeader = response.headers.get("x-search");
      setSearchForMessages(searchHeader);
      const sourcesHeader = response.headers.get("x-sources");
      const sources = sourcesHeader
        ? JSON.parse(Buffer.from(sourcesHeader, "base64").toString("utf8"))
        : [];
      const messageIndexHeader = response.headers.get("x-message-index");
      if (sources.length && messageIndexHeader !== null) {
        setSourcesForMessages({
          ...sourcesForMessages,
          [messageIndexHeader]: sources,
        });
      }
    },
    onError: (e) => {
      toast(e.message);
    },
  });

  async function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!messages.length) {
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
    if (chatEndpointIsLoading) {
      return;
    }
    handleSubmit(e);
  }

  return (
    <>
      <div className="flex-1 h-full p-0 mt-0 border-0">
        <div className="h-full">
          <div className="flex flex-col w-full h-full p-4 border rounded-lg">
            {messages.length > 0 ? (
              <ScrollArea className="flex-1 min-h-0">
                <div className="flex flex-col">
                  {[...messages].reverse().map((m, i) => {
                    const sourceKey = (messages.length - 1 - i).toString();
                    return m.role === "system" ? (
                      <IntermediateStep
                        key={m.id}
                        message={m}
                      ></IntermediateStep>
                    ) : (
                      <ChatMessageBubble
                        key={m.id}
                        message={m}
                        aiEmoji={emoji}
                        sources={sourcesForMessages[sourceKey]}
                        search={searchForMessages}
                      />
                    );
                  })}
                </div>
              </ScrollArea>
            ) : (
              <div className="flex flex-col items-center gap-4 p-5 mt-auto text-center rounded-lg">
                <QuestionMarkCircledIcon className="size-10" />
                <p className="text-lg text-center">
                  {titleText}
                  <br />
                </p>
              </div>
            )}

            <form
              onSubmit={sendMessage}
              className="flex flex-col w-full mt-auto"
            >
              <div className="flex w-full gap-2 mt-4">
                <Input
                  value={input}
                  placeholder={placeholder ?? "What's it like to be a pirate?"}
                  onChange={handleInputChange}
                />
                <Button type="submit">
                  <div
                    role="status"
                    className={`${
                      chatEndpointIsLoading ? "" : "hidden"
                    } flex justify-center`}
                  >
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6 text-white animate-spin dark:text-white fill-sky-800"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                  <span className={chatEndpointIsLoading ? "hidden" : ""}>
                    Send
                  </span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="flex-col hidden space-y-4 sm:flex basis-[250px]">
        <ModelSelector
          types={types}
          models={models}
          value={model}
          onValueChange={setModel}
        />
        <TemperatureSelector
          value={temperature}
          onValueChange={setTemperature}
        />
        <MaxLengthSelector
          value={maxTokens}
          onValueChange={setMaxTokens}
          max={model.maxTokens}
        />
        <TopPSelector value={topP} onValueChange={setTopP} />
      </div>
    </>
  );
}
