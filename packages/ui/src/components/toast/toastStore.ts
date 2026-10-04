import { useSyncExternalStore } from 'react';

export type ToastTone = 'info' | 'success' | 'warning' | 'error';

export interface ToastMessage {
  id: string;
  title?: string;
  description?: string;
  tone: ToastTone;
  /** Auto-dismiss after ms; 0 keeps it until dismissed. */
  duration: number;
  /** Optional action label + handler. */
  action?: { label: string; onClick: () => void };
}

export interface ToastOptions {
  title?: string;
  description?: string;
  tone?: ToastTone;
  duration?: number;
  action?: { label: string; onClick: () => void };
}

let toasts: ToastMessage[] = [];
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return toasts;
}

let counter = 0;

export function addToast(opts: ToastOptions | string): string {
  const o = typeof opts === 'string' ? { description: opts } : opts;
  const id = `toast-${++counter}`;
  const msg: ToastMessage = {
    id,
    title: o.title,
    description: o.description,
    tone: o.tone ?? 'info',
    duration: o.duration ?? 5000,
    action: o.action,
  };
  toasts = [...toasts, msg];
  emit();
  return id;
}

export function dismissToast(id: string) {
  toasts = toasts.filter((t) => t.id !== id);
  emit();
}

export function clearToasts() {
  toasts = [];
  emit();
}

/** Read the live toast list (used by the Toaster viewport). */
export function useToasts(): ToastMessage[] {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

/** Imperative API — call from anywhere, no hook required. */
export const toast = Object.assign(
  (opts: ToastOptions | string) => addToast(opts),
  {
    info: (description: string, opts?: Omit<ToastOptions, 'tone' | 'description'>) =>
      addToast({ ...opts, description, tone: 'info' }),
    success: (description: string, opts?: Omit<ToastOptions, 'tone' | 'description'>) =>
      addToast({ ...opts, description, tone: 'success' }),
    warning: (description: string, opts?: Omit<ToastOptions, 'tone' | 'description'>) =>
      addToast({ ...opts, description, tone: 'warning' }),
    error: (description: string, opts?: Omit<ToastOptions, 'tone' | 'description'>) =>
      addToast({ ...opts, description, tone: 'error' }),
    dismiss: dismissToast,
    clear: clearToasts,
  },
);

/** Hook form for ergonomics in components. */
export function useToast() {
  return toast;
}
