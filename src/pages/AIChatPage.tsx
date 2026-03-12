import { AppLayout } from "@/components/AppLayout";
import { useState } from "react";
import { Send, Bot, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const defaultMessages: Message[] = [
  {
    role: "assistant",
    content: "Resource Query Engine ready. Ask about hospital beds, blood inventory, or availability across facilities. Example: \"Which hospitals have O- blood available?\"",
  },
];

const mockResponses: Record<string, string> = {
  "o-": "**O- Blood Availability:**\n\n| Hospital | Units | Status |\n|---|---|---|\n| City General Hospital | 3 | 🔴 Critical |\n| Metro Emergency Hospital | 0 | 🔴 Depleted |\n| Apollo Care Hospital | 5 | 🔴 Critical |\n\n⚠️ O- stock is critically low across all facilities. Recommend immediate donor call.",
  "icu": "**ICU Bed Availability:**\n\n| Hospital | Available | Total | Status |\n|---|---|---|---|\n| City General | 3 | 20 | 🟡 Low |\n| St. Mary's | 0 | 15 | 🔴 Full |\n| Metro Emergency | 8 | 25 | 🟢 Available |\n| National Heart | 15 | 30 | 🟢 Available |\n| Apollo Care | 0 | 18 | 🔴 Full |\n\nMetro Emergency and National Heart have the most ICU capacity.",
  "critical": "**Current Critical Alerts (6):**\n\n1. 🔴 City General — O- blood: 3 units (threshold: 8)\n2. 🔴 St. Mary's — ICU: 0 beds available\n3. 🔴 Metro Emergency — O- blood: depleted\n4. 🔴 Apollo Care — ICU: 0 beds available\n5. 🔴 St. Mary's — B- blood: 1 unit\n6. 🔴 National Heart — A- blood: depleted\n\nRecommend prioritizing O- and B- donor recruitment.",
};

const AIChatPage = () => {
  const [messages, setMessages] = useState<Message[]>(defaultMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const lower = input.toLowerCase();
      let response = "Based on current data across 5 facilities:\n\n• **190 beds available** out of 623 total\n• **345 blood units** in stock across all groups\n• **6 critical alerts** require attention\n\nTry asking about specific blood groups (e.g. \"O- availability\") or ward types (e.g. \"ICU beds\") for detailed data.";

      for (const [key, val] of Object.entries(mockResponses)) {
        if (lower.includes(key)) {
          response = val;
          break;
        }
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <AppLayout title="AI Resource Query Engine" subtitle="Ask about hospital resources using natural language">
      <div className="bg-card rounded-xl shadow-card flex flex-col h-[calc(100vh-10rem)]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
              {msg.role === "assistant" && (
                <div className="flex-shrink-0 h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Bot className="h-3.5 w-3.5 text-primary" />
                </div>
              )}
              <div className={`max-w-[70%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-accent text-foreground"
              }`}>
                <pre className="whitespace-pre-wrap font-sans text-sm">{msg.content}</pre>
              </div>
              {msg.role === "user" && (
                <div className="flex-shrink-0 h-7 w-7 rounded-lg bg-primary/20 flex items-center justify-center">
                  <User className="h-3.5 w-3.5 text-primary" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="flex-shrink-0 h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <Bot className="h-3.5 w-3.5 text-primary" />
              </div>
              <div className="bg-accent rounded-xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-border p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder='Query resources... (try "O- availability" or "ICU beds")'
              className="flex-1 h-10 rounded-lg border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring font-mono"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors duration-150 active:scale-[0.98] flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-[10px] text-muted-foreground">
            Currently using mock data. Enable Lovable Cloud for live Gemini AI integration.
          </p>
        </div>
      </div>
    </AppLayout>
  );
};

export default AIChatPage;
