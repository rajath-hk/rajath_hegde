'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function DownloadResume() {
  const { toast } = useToast();
  const handleDownload = async () => {
    try {
      const response = await fetch('/resume.pdf');
      if (!response.ok) throw new Error('Resume not found');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'rajath_hegde_resume.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast({
        title: 'Success!',
        description: 'Resume downloaded successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not download resume. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Button
      onClick={handleDownload}
      className="gap-2 hover:scale-105 transition-transform"
      variant="default"
    >
      <Download className="h-4 w-4" />
      Download Resume
    </Button>
  );
}