import { forwardRef } from 'react';
import * as RadixProgress from '@radix-ui/react-progress';
import { cn } from '../utils/cn';

export interface ProgressBarProps {
  /** 0–100. Omit (or pass `null`) for an indeterminate bar. */
  value?: number | null;
  /** Upper bound for `value`. */
  max?: number;
  size?: 'sm' | 'md';
  tone?: 'primary' | 'success' | 'error';
  /** Accessible label describing what is progressing. */
  label?: string;
  className?: string;
}

const tones = {
  primary: 'bg-primary-500',
  success: 'bg-success',
  error: 'bg-error',
};

/** Determinate or indeterminate progress indicator. */
export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(function ProgressBar(
  { value = null, max = 100, size = 'md', tone = 'primary', label, className },
  ref,
) {
  const indeterminate = value === null || value === undefined;
  const pct = indeterminate ? 0 : Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <RadixProgress.Root
      ref={ref}
      value={indeterminate ? null : value}
      max={max}
      aria-label={label}
      className={cn(
        'relative w-full overflow-hidden rounded-full bg-surface-muted',
        size === 'sm' ? 'h-1.5' : 'h-2',
        className,
      )}
    >
      <RadixProgress.Indicator
        className={cn(
          'h-full rounded-full transition-[width] duration-slow ease-standard',
          tones[tone],
          indeterminate && 'w-1/3 animate-[ds-indeterminate_1.2s_ease-in-out_infinite] motion-reduce:animate-none motion-reduce:w-1/2',
        )}
        style={indeterminate ? undefined : { width: `${pct}%` }}
      />
    </RadixProgress.Root>
  );
});
