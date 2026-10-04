import { cn } from '../utils/cn';
import { Avatar, type AvatarSize } from './Avatar';

const chipSize: Record<AvatarSize, string> = {
  xs: 'h-6 w-6 text-[0.625rem]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
};

export interface AvatarGroupProps {
  people: { name: string; src?: string }[];
  /** How many to show before collapsing into a "+N" chip. */
  max?: number;
  size?: AvatarSize;
  className?: string;
}

/** Overlapping avatars with an overflow count. */
export function AvatarGroup({ people, max = 4, size = 'sm', className }: AvatarGroupProps) {
  const shown = people.slice(0, max);
  const extra = people.length - shown.length;
  return (
    <div className={cn('flex -space-x-2', className)}>
      {shown.map((p, i) => (
        <Avatar key={i} name={p.name} src={p.src} size={size} className="rounded-full ring-2 ring-surface" />
      ))}
      {extra > 0 && (
        <span
          className={cn(
            'grid shrink-0 place-items-center rounded-full bg-surface-muted font-medium text-ink-muted ring-2 ring-surface',
            chipSize[size],
          )}
        >
          +{extra}
        </span>
      )}
    </div>
  );
}
