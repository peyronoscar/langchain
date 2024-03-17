import { ChatWindow } from "@//components/ChatWindow";

export default function AgentsPage() {
  return (
    <ChatWindow
      endpoint="api/chat/agents"
      placeholder="Squawk! I'm a conversational agent! Ask me about the current weather in Honolulu!"
      titleText="Polly the Agentic Parrot"
      emoji="🦜"
    ></ChatWindow>
  );
}
