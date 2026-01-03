'use client';

import { ReactNode } from 'react';
import { WindowProvider } from '@/contexts/window-context';

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return <WindowProvider>{children}</WindowProvider>;
}

