import { type HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

export type StatusTone = 'active' | 'degraded' | 'offline' | 'neutral';

export interface StatusDotProps extends HTMLAttributes<HTMLSpanElement> {
  status?: StatusTone;
  /** Soft ping animation; defaults to on for `active`. */
  pulse?: boolean;
  size?: 'sm' | 'md';
  /** Optional text label shown next to the dot. */
  label?: string;
}

const toneBg: Record<StatusTone, string> = {
  active: 'bg-success',
  degraded: 'bg-warning',
  offline: 'bg-ink-subtle',
  neutral: 'bg-ink-subtle',
};

/**
 * A small status indicator with an optional live "ping". Used for platform /
 * connection health and presence.
 */
export function StatusDot({ status = 'neutral', pulse, size = 'md', label, className, ...rest }: StatusDotProps) {
  const dim = size === 'sm' ? 'h-1.5 w-1.5' : 'h-2 w-2';
  const doPulse = pulse ?? status === 'active';
  const dot = (
    <span className={cn('relative inline-flex', dim)}>
      {doPulse && (
        <span className={cn('absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 motion-reduce:hidden', toneBg[status])} />
      )}
      <span className={cn('relative inline-flex rounded-full ring-2 ring-surface', dim, toneBg[status])} />
    </span>
  );
  if (!label) {
    return (
      <span className={cn('inline-flex', className)} {...rest}>
        {dot}
      </span>
    );
  }
  return (
    <span className={cn('inline-flex items-center gap-1.5 text-xs text-ink-muted', className)} {...rest}>
      {dot}
      {label}
    </span>
  );
}
