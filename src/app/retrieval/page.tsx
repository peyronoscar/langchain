import { ChatWindow } from "@//components/ChatWindow";

export default function AgentsPage() {
  return (
    <ChatWindow
      endpoint="api/chat/retrieval"
      placeholder={
        'I\'ve got a nose for finding the right documents! Ask, "What is a document loader?"'
      }
      emoji="🐶"
      titleText="Dana the Document-Retrieving Dog"
    ></ChatWindow>
  );
}
