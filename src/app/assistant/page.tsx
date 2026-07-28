"use client";

import React, { useState, useRef, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Send, User, Sparkles, RefreshCw, ThumbsUp, Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// ── Static conversation seeds ─────────────────────────────────────────────

const SUGGESTED = [
  "What is the current El Niño impact on Sri Lanka's rainfall patterns?",
  "Which districts are at highest flood risk this monsoon season?",
  "How will climate change affect tea production in the central highlands?",
  "What does the 7-day forecast look like for the Eastern Province?",
  "Explain the Southern Oscillation Index and its relevance to Sri Lanka.",
];

const MOCK_RESPONSES: Record<string, string> = {
  default: `Based on current atmospheric and oceanic data from the Lanka Climate Hub sensor network, here is what our climate intelligence models are showing:

**Current Conditions**
- National average temperature is running **+1.2°C above** the seasonal norm.
- The South-West Monsoon is tracking approximately **8 days ahead** of the historical mean onset.
- Sea surface temperatures in the Bay of Bengal remain elevated at **+1.4°C** anomaly (Niño 3.4 index).

**Key Observations**
The current El Niño phase is suppressing typical monsoon rainfall intensity across the Dry Zone provinces. This creates a dual-risk scenario — flash flooding in the Wet Zone from concentrated rain events, while the North-Central and Northern provinces face prolonged dry spells.

**Recommendation**
Monitor DMC advisories closely. Agricultural stakeholders in Anuradhapura and Polonnaruwa districts should prepare drought-resilient crop strategies for the upcoming Maha season.

*Data sourced from: DMC, Department of Meteorology, NBRO — updated every 15 minutes.*`,
};

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="h-2 w-2 rounded-full bg-primary"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Render basic markdown bold (**text**) and newlines
  const renderContent = (text: string) => {
    return text.split("\n").map((line, i) => {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <p key={i} className={i > 0 ? "mt-2" : ""}>
          {parts.map((part, j) =>
            j % 2 === 1 ? <strong key={j} className="text-white font-semibold">{part}</strong> : part
          )}
        </p>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("flex gap-3", isUser ? "flex-row-reverse" : "flex-row")}
    >
      {/* Avatar */}
      <div className={cn(
        "h-9 w-9 rounded-full shrink-0 flex items-center justify-center border",
        isUser
          ? "bg-primary/20 border-primary/30"
          : "bg-secondary/10 border-secondary/20"
      )}>
        {isUser
          ? <User className="h-4 w-4 text-primary" />
          : <Bot className="h-4 w-4 text-secondary" />}
      </div>

      {/* Bubble */}
      <div className={cn("max-w-[80%] group", isUser ? "items-end" : "items-start")}>
        <div className={cn(
          "rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "bg-primary/20 border border-primary/30 text-white rounded-tr-sm"
            : "glass-card border-white/5 text-white/90 rounded-tl-sm"
        )}>
          {isUser
            ? <p>{message.content}</p>
            : <div className="space-y-0">{renderContent(message.content)}</div>
          }
        </div>
        <div className={cn(
          "flex items-center gap-2 mt-1 px-1 opacity-0 group-hover:opacity-100 transition-opacity",
          isUser ? "justify-end" : "justify-start"
        )}>
          <span className="text-[10px] text-muted-foreground">
            {message.timestamp.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
          </span>
          {!isUser && (
            <>
              <button onClick={handleCopy} className="text-muted-foreground hover:text-white transition-colors" aria-label="Copy message">
                <Copy className="h-3 w-3" />
              </button>
              <button className="text-muted-foreground hover:text-safe transition-colors" aria-label="Like response">
                <ThumbsUp className="h-3 w-3" />
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Welcome to the Lanka Climate Hub AI Assistant — powered by advanced large language models trained on national climate datasets, meteorological archives, and real-time sensor telemetry.\n\nI can help you with **weather analysis**, **ENSO impacts**, **agricultural planning**, **disaster preparedness**, **marine conditions**, and **historical climate data**.\n\nWhat would you like to know?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI latency
    setTimeout(() => {
      const response = MOCK_RESPONSES.default;
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: response, timestamp: new Date() },
      ]);
    }, 1800 + Math.random() * 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([{
      id: "reset",
      role: "assistant",
      content: "Chat cleared. Ask me anything about Sri Lanka's climate!",
      timestamp: new Date(),
    }]);
  };

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 space-y-5">
      <PageHeader
        title="AI Climate Assistant"
        description="Ask complex questions about Sri Lanka's weather, climate change, disaster risk, agriculture, and environment."
        icon={<Bot className="h-7 w-7 text-secondary" />}
        actions={
          <button
            onClick={clearChat}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-muted-foreground hover:text-white hover:bg-white/10 transition-all text-sm"
            aria-label="Clear conversation"
          >
            <RefreshCw className="h-4 w-4" /> Clear
          </button>
        }
      />

      {/* AI model badge */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-semibold">
          <Sparkles className="h-3.5 w-3.5" />
          Lanka Climate AI v1.0 · Powered by multimodal climate LLM
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-safe/10 border border-safe/20 text-safe text-xs font-semibold">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-safe opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-safe" />
          </span>
          Live Data Connected
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-5 min-h-0">

        {/* Suggested Prompts — sidebar on desktop */}
        <div className="lg:w-64 shrink-0">
          <Card className="glass-card border-white/5 h-full">
            <CardContent className="p-5">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-secondary" /> Suggested Questions
              </h3>
              <div className="space-y-2">
                {SUGGESTED.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(prompt)}
                    disabled={isTyping}
                    className="w-full text-left text-xs text-muted-foreground hover:text-white bg-black/20 hover:bg-white/5 border border-white/5 hover:border-white/15 rounded-xl p-3 transition-all leading-relaxed disabled:opacity-40"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col glass-card rounded-2xl border-white/5 overflow-hidden min-h-[500px]">

          {/* Message list */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5" role="log" aria-live="polite" aria-label="Chat messages">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-3"
                >
                  <div className="h-9 w-9 rounded-full bg-secondary/10 border border-secondary/20 shrink-0 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-secondary" />
                  </div>
                  <div className="glass-card rounded-2xl rounded-tl-sm border-white/5">
                    <TypingIndicator />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={bottomRef} />
          </div>

          {/* Input bar */}
          <div className="border-t border-white/5 p-4">
            <div className="flex gap-3 items-end">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about weather, climate change, disasters, agriculture..."
                rows={1}
                disabled={isTyping}
                className="flex-1 bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none backdrop-blur-md transition-all disabled:opacity-50"
                style={{ maxHeight: "120px", overflowY: "auto" }}
                aria-label="Message input"
              />
              <button
                onClick={() => sendMessage()}
                disabled={isTyping || !input.trim()}
                className="h-11 w-11 rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shrink-0 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40"
                aria-label="Send message"
              >
                <Send className="h-4 w-4 text-white" />
              </button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 text-center">
              Responses are generated from climate models and may not reflect real-time conditions. Always verify critical decisions with official DMC advisories.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
