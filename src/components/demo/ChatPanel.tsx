"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Send } from "lucide-react";
import { TASK_PILLS, type DemoPrompt, type TaskPill } from "./data";

export interface ChatMessage {
  id: string;
  role: "agent" | "user";
  text: string;
}

interface ChatPanelProps {
  messages: ChatMessage[];
  isTyping: boolean;
  selectedTaskKey: TaskPill["key"] | null;
  onSelectTask: (key: TaskPill["key"]) => void;
  onRunPrompt: (prompt: DemoPrompt) => void;
}

export function ChatPanel({
  messages,
  isTyping,
  selectedTaskKey,
  onSelectTask,
  onRunPrompt,
}: ChatPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const selectedTask = TASK_PILLS.find((task) => task.key === selectedTaskKey) ?? null;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex h-full flex-col rounded-3xl border border-[color:var(--color-border)] bg-white p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#F04255_0%,#EF2D3E_55%,#C41230_100%)] text-white">
          <Zap size={16} strokeWidth={2} fill="currentColor" />
        </span>
        <div>
          <p className="text-sm font-semibold text-[color:var(--color-text-primary)]">
            Command Surface
          </p>
          <p className="text-xs text-[color:var(--color-text-muted)]">TARIFF.IO Agent</p>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex max-h-[280px] min-h-[160px] flex-1 flex-col gap-2.5 overflow-y-auto pr-1"
      >
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={
              message.role === "agent"
                ? "max-w-[85%] rounded-2xl rounded-tl-sm bg-[color:var(--color-surface-alt)] px-3.5 py-2.5 text-sm text-[color:var(--color-text-primary)]"
                : "ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-[color:var(--color-primary)] px-3.5 py-2.5 text-sm text-white"
            }
          >
            {message.text}
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex w-fit items-center gap-1 rounded-2xl rounded-tl-sm bg-[color:var(--color-surface-alt)] px-3.5 py-3"
          >
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className="h-1.5 w-1.5 animate-bounce rounded-full bg-[color:var(--color-text-muted)]"
                style={{ animationDelay: `${dot * 0.12}s` }}
              />
            ))}
          </motion.div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {TASK_PILLS.map((task) => {
          const Icon = task.icon;
          const active = task.key === selectedTaskKey;
          return (
            <button
              key={task.key}
              type="button"
              onClick={() => onSelectTask(task.key)}
              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors duration-200 ${
                active
                  ? "border-transparent bg-[color:var(--color-primary)] text-white"
                  : "border-[color:var(--color-border)] bg-white text-[color:var(--color-text-secondary)] hover:border-[color:var(--color-primary-border)] hover:text-[color:var(--color-primary)]"
              }`}
            >
              <Icon size={14} strokeWidth={2} />
              {task.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {selectedTask && (
          <motion.div
            key={selectedTask.key}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-3 flex flex-col gap-2">
              {selectedTask.prompts.map((prompt, index) => (
                <motion.button
                  key={prompt.text}
                  type="button"
                  onClick={() => onRunPrompt(prompt)}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.08 }}
                  className="cursor-pointer rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface-alt)] px-3.5 py-2.5 text-left text-xs leading-snug text-[color:var(--color-text-secondary)] transition-colors duration-200 hover:border-[color:var(--color-primary-border)] hover:text-[color:var(--color-text-primary)]"
                >
                  {prompt.text}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-4 flex items-center gap-2 rounded-xl border border-[color:var(--color-border)] bg-white px-3.5 py-2.5">
        <input
          type="text"
          disabled
          placeholder={selectedTask?.inputPlaceholder ?? "Describe a product or paste an HTS code…"}
          className="w-full bg-transparent text-sm text-[color:var(--color-text-primary)] outline-none placeholder:text-[color:var(--color-text-muted)]"
        />
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[color:var(--color-primary-light)] text-[color:var(--color-primary)]">
          <Send size={13} strokeWidth={2} />
        </span>
      </div>
    </div>
  );
}
