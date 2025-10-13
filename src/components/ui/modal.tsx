import React from 'react';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  id?: string;
};

export default function Modal({ open, onClose, title, children, id = 'modal' }: ModalProps) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${id}-title`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-3xl bg-background rounded-lg shadow-lg border border-border overflow-auto">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h2 id={`${id}-title`} className="text-lg font-semibold">{title}</h2>
          <button aria-label="Close modal" className="ml-4 p-1 rounded" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
