import { type ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  /** Optional centered label (horizontal only). */
  label?: ReactNode;
  className?: string;
}

/** A thin separator. Horizontal by default; `vertical` stretches to its row. */
export function Divider({ orientation = 'horizontal', label, className }: DividerProps) {
  if (orientation === 'vertical') {
    return <div role="separator" aria-orientation="vertical" className={cn('w-px self-stretch bg-border', className)} />;
  }
  if (label) {
    return (
      <div className={cn('flex items-center gap-3', className)}>
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium uppercase tracking-wide text-ink-subtle">{label}</span>
        <span className="h-px flex-1 bg-border" />
      </div>
    );
  }
  return <div role="separator" aria-orientation="horizontal" className={cn('h-px w-full bg-border', className)} />;
}
