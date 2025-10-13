"use client";
import React from "react";
import { Bot } from "lucide-react";

export function ChatbotPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center p-6 border rounded-lg bg-secondary/60">
      <Bot className="w-8 h-8 mb-2 text-primary" />
      <h3 className="font-bold text-lg mb-1">Live Chat Coming Soon</h3>
      <p className="text-sm text-muted-foreground text-center">A live chat or AI assistant will be available here for instant communication.</p>
    </div>
  );
}
