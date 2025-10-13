'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Award, Star, Trophy, Medal } from 'lucide-react';

interface Achievement {
  icon: React.ReactNode;
  title: string;
  description: string;
  year: string;
}

const achievements: Achievement[] = [
  {
    icon: <Trophy className="h-5 w-5 text-yellow-500" />,
    title: 'Best Project Award',
    description: 'Received for innovative implementation of AI features',
    year: '2024'
  },
  {
    icon: <Star className="h-5 w-5 text-blue-500" />,
    title: 'Open Source Contributor',
    description: 'Major contributions to popular React libraries',
    year: '2023'
  },
  {
    icon: <Medal className="h-5 w-5 text-green-500" />,
    title: 'Tech Excellence',
    description: 'Recognition for technical leadership and mentoring',
    year: '2023'
  },
  {
    icon: <Award className="h-5 w-5 text-purple-500" />,
    title: 'Innovation Award',
    description: 'Created groundbreaking solutions for client projects',
    year: '2022'
  }
];

interface AchievementsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AchievementsModal({ open, onOpenChange }: AchievementsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            Achievements & Awards
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex gap-4 p-4 bg-secondary/20 rounded-lg hover:bg-secondary/30 transition-colors"
              >
                <div className="flex-shrink-0 mt-1">{achievement.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{achievement.title}</h3>
                    <Badge variant="outline">{achievement.year}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}