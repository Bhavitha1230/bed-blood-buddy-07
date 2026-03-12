import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const mockResponses: Record<string, string> = {
  default:
    "I'm your Bed & Blood AI assistant. I can help you find hospitals, check blood availability, and answer medical queries. How can I help?",
  blood:
    "Based on current data, **O+ blood** is available at Apollo Hospital (3 km) and Red Cross Center (5 km). Would you like directions?",
  bed: "There are **12 ICU beds** and **45 general beds** available across nearby hospitals. Apollo Hospital has the most availability right now.",
  hospital:
    "The nearest hospitals with availability are:\n1. **Apollo Hospital** — 3 km, 12 beds\n2. **City General** — 5 km, 8 beds\n3. **Red Cross Center** — 7 km, 15 beds",
  emergency:
    "🚨 For emergencies, please call **108** immediately. I can also help you find the nearest hospital with ICU beds available.",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("blood")) return mockResponses.blood;
  if (lower.includes("bed") || lower.includes("icu")) return mockResponses.bed;
  if (lower.includes("hospital") || lower.includes("near")) return mockResponses.hospital;
  if (lower.includes("emergency") || lower.includes("urgent")) return mockResponses.emergency;
  return mockResponses.default;
}

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: mockResponses.default },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: getResponse(input) },
      ]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* FAB */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-gradient-hero p-4 rounded-full shadow-elevated text-primary-foreground hover:scale-105 transition-transform"
          >
            <MessageCircle className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-h-[520px] flex flex-col bg-card rounded-2xl shadow-elevated border border-border overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-hero px-5 py-4 flex items-center justify-between text-primary-foreground">
              <div className="flex items-center gap-3">
                <Bot className="h-5 w-5" />
                <div>
                  <p className="font-display font-semibold text-sm">AI Assistant</p>
                  <p className="text-xs opacity-80">Powered by Gemini</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="hover:opacity-70">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="bg-primary/10 p-1.5 rounded-lg h-fit">
                      <Bot className="h-3.5 w-3.5 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-secondary text-secondary-foreground rounded-bl-md"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="bg-muted p-1.5 rounded-lg h-fit">
                      <User className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-2 items-center">
                  <div className="bg-primary/10 p-1.5 rounded-lg">
                    <Bot className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="bg-secondary px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-pulse-glow" />
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-pulse-glow [animation-delay:0.3s]" />
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-pulse-glow [animation-delay:0.6s]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border p-3 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask about beds, blood, hospitals..."
                className="flex-1 bg-secondary rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                onClick={send}
                disabled={!input.trim()}
                className="bg-primary text-primary-foreground p-2.5 rounded-xl hover:opacity-90 disabled:opacity-40 transition-opacity"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
