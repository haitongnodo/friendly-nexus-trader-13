import { useState } from "react";
import { MessageSquare } from "lucide-react";

const Index = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content: "Hi! I'm Nexus, your AI trading companion. How can I help you today?",
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      { type: "user", content: message },
      { type: "bot", content: "I'm still being developed, but I'll be able to help you with trading soon!" },
    ]);
    setMessage("");
  };

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <div className="space-y-4">
        <div className="glass rounded-lg p-4 min-h-[600px] flex flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.type === "user"
                      ? "orange-gradient text-white"
                      : "bg-white/5 text-white"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-white/5 rounded-lg px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-nodo-orange"
            />
            <button
              type="submit"
              className="orange-gradient p-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              <MessageSquare className="w-6 h-6 text-white" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;