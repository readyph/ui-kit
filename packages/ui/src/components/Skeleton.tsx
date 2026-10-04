import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rect' | 'circle';
  width?: string | number;
  height?: string | number;
}

/** Content placeholder shown while data loads. */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  { variant = 'rect', width, height, className, style, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        'relative overflow-hidden bg-surface-muted',
        variant === 'text' && 'h-4 rounded-sm',
        variant === 'rect' && 'rounded-base',
        variant === 'circle' && 'rounded-full',
        'after:absolute after:inset-0 after:-translate-x-full after:animate-[ds-shimmer_1.6s_infinite] after:bg-gradient-to-r after:from-transparent after:via-white/60 after:to-transparent motion-reduce:after:animate-none',
        className,
      )}
      style={{ width, height, ...style }}
      {...rest}
    />
  );
});
