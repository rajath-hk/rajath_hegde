"use client";
import React, { useState } from "react";
import { Bell, X } from "lucide-react";

const notifications = [
  { id: 1, message: "Welcome to the portfolio!", type: "info" },
  { id: 2, message: "Try the new drag-and-drop windows!", type: "tip" },
];

export function NotificationCenter() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className="fixed top-6 right-6 z-50 bg-card border border-border rounded-lg shadow-lg w-80">
      <div className="flex items-center justify-between p-3 border-b border-border">
        <span className="flex items-center gap-2 font-semibold text-base"><Bell className="w-4 h-4" /> Notifications</span>
        <button onClick={() => setVisible(false)} aria-label="Dismiss notifications">
          <X className="w-4 h-4 text-muted-foreground hover:text-destructive transition-colors" />
        </button>
      </div>
      <ul className="divide-y divide-border">
        {notifications.map(n => (
          <li key={n.id} className="p-3 text-sm">
            {n.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
