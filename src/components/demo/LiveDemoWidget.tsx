"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { ChatPanel, type ChatMessage } from "./ChatPanel";
import { WorkspacePanel } from "./WorkspacePanel";
import type { DemoPrompt, DemoResult, TaskPill } from "./data";

const INITIAL_MESSAGE: ChatMessage = {
  id: "greeting",
  role: "agent",
  text: "Hi, I'm the TARIFF.IO agent. Describe a product or pick a task below.",
};

export function LiveDemoWidget() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [selectedTaskKey, setSelectedTaskKey] = useState<TaskPill["key"] | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [activeResult, setActiveResult] = useState<DemoResult | null>(null);
  const [runId, setRunId] = useState(0);

  const handleSelectTask = useCallback((key: TaskPill["key"]) => {
    setSelectedTaskKey((current) => (current === key ? null : key));
  }, []);

  const handleRunPrompt = useCallback((prompt: DemoPrompt) => {
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: prompt.text,
    };
    setMessages((current) => [...current.slice(-3), userMessage]);
    setIsTyping(true);

    window.setTimeout(() => {
      setIsTyping(false);
      setMessages((current) => [
        ...current.slice(-3),
        { id: `agent-${Date.now()}`, role: "agent", text: prompt.result.agentReply },
      ]);
      setActiveResult(prompt.result);
      setRunId((id) => id + 1);
    }, 750);
  }, []);

  return (
    <section id="demo" className="bg-[color:var(--color-surface-alt)] px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--color-primary)]">
            See it work
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-[color:var(--color-text-primary)] sm:text-4xl">
            The actual Workspace screen — staged for the web
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[color:var(--color-text-secondary)]">
            Pick a task, choose a prompt, and watch the classification and duty
            stack build in real time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 gap-5 rounded-[28px] border border-[color:var(--color-border)] bg-white p-5 shadow-[0_8px_40px_rgba(0,0,0,0.06)] lg:grid-cols-2 lg:p-6"
        >
          <ChatPanel
            messages={messages}
            isTyping={isTyping}
            selectedTaskKey={selectedTaskKey}
            onSelectTask={handleSelectTask}
            onRunPrompt={handleRunPrompt}
          />
          <WorkspacePanel result={activeResult} runId={runId} />
        </motion.div>
      </div>
    </section>
  );
}
