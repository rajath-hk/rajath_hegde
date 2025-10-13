"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const activities = [
  { type: "Blog", label: "New blog post: Building a Retro OS Portfolio", date: "2025-10-10" },
  { type: "Update", label: "Added drag-and-drop windows", date: "2025-10-09" },
  { type: "Status", label: "Open for freelance projects!", date: "2025-10-08" },
];

export function DesktopActivity() {
  return (
    <Card className="p-4 mb-4">
      <h2 className="text-lg font-bold mb-2">Recent Activity</h2>
      <ul className="space-y-2">
        {activities.map((a, i) => (
          <li key={i} className="flex items-center gap-2">
            <Badge variant="secondary">{a.type}</Badge>
            <span className="text-sm">{a.label}</span>
            <span className="ml-auto text-xs text-muted-foreground">{a.date}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
