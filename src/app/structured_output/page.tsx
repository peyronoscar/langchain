import { ChatWindow } from "@//components/ChatWindow";

export default function AgentsPage() {
  return (
    <ChatWindow
      endpoint="api/chat/structured_output"
      placeholder={`No matter what you type here, I'll always return the same JSON object with the same structure!`}
      emoji="🧱"
      titleText="Structured Output"
    ></ChatWindow>
  );
}
