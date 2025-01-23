import { useState } from "react";
import { MessageSquare, Paperclip, Calendar, Globe, Mic } from "lucide-react";
import { motion } from "framer-motion";

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
      {/* Hero Section with Animation */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 space-y-3"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-nodo-orange to-nodo-orange-light bg-clip-text text-transparent">
          NODO: Democratizing DeFi Trading with AI
        </h1>
        <p className="text-gray-400 text-lg">
          Building the Future of AI-Powered Trading on Sui Network
        </p>
      </motion.div>

      <div className="space-y-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass rounded-lg p-4 min-h-[600px] flex flex-col"
        >
          {/* Messages Container */}
          <div className="flex-1 space-y-4 overflow-y-auto mb-4">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className={`flex ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.type === "user"
                      ? "orange-gradient text-white"
                      : "bg-white/5 text-white hover:bg-white/10 transition-colors duration-200"
                  }`}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Input Section with ChatGPT-like UI */}
          <form onSubmit={handleSubmit} className="relative">
            <div className="absolute bottom-full left-0 right-0 p-2 flex gap-2 justify-center border-t border-white/10">
              <button className="text-gray-400 hover:text-nodo-orange transition-colors duration-200 px-3 py-1 rounded-md text-sm">
                Xử lý
              </button>
              <button className="text-gray-400 hover:text-nodo-orange transition-colors duration-200 px-3 py-1 rounded-md text-sm">
                Mã
              </button>
              <button className="text-gray-400 hover:text-nodo-orange transition-colors duration-200 px-3 py-1 rounded-md text-sm">
                Phân tích hình ảnh
              </button>
              <button className="text-gray-400 hover:text-nodo-orange transition-colors duration-200 px-3 py-1 rounded-md text-sm">
                Tóm tắt văn bản
              </button>
            </div>
            
            <div className="flex gap-2 items-center bg-white/5 rounded-lg p-2 hover:bg-white/10 transition-all duration-200">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message Nexus..."
                className="flex-1 bg-transparent px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none"
              />
              <div className="flex gap-2 items-center">
                <button type="button" className="p-2 text-gray-400 hover:text-nodo-orange transition-colors duration-200">
                  <Paperclip className="w-5 h-5" />
                </button>
                <button type="button" className="p-2 text-gray-400 hover:text-nodo-orange transition-colors duration-200">
                  <Mic className="w-5 h-5" />
                </button>
                <button
                  type="submit"
                  className="orange-gradient p-2 rounded-lg hover:opacity-90 transition-all duration-200"
                >
                  <MessageSquare className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;