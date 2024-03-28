import { ChatWindow } from "@//components/ChatWindow";

export default function AgentsPage() {
  return (
    <ChatWindow
      endpoint="api/chat/retrieval"
      placeholder={"Write your question here..."}
      emoji="🐶"
      titleText="Ask me anything regarding IKEA and I will generate an article for you!"
    ></ChatWindow>
  );
}
