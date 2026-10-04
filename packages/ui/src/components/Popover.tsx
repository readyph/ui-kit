import { type ReactNode } from 'react';
import * as RadixPopover from '@radix-ui/react-popover';
import { cn } from '../utils/cn';

export interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  /** Padding preset for the panel. */
  padding?: 'none' | 'sm' | 'md';
  className?: string;
}

const paddings = { none: 'p-0', sm: 'p-2', md: 'p-4' };

/** A click-triggered floating panel built on Radix Popover. */
export function Popover({
  trigger,
  children,
  open,
  onOpenChange,
  side = 'bottom',
  align = 'start',
  padding = 'md',
  className,
}: PopoverProps) {
  return (
    <RadixPopover.Root open={open} onOpenChange={onOpenChange}>
      <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          side={side}
          align={align}
          sideOffset={6}
          className={cn(
            'z-popover w-72 rounded-md border border-border bg-surface text-sm text-ink shadow-lg focus:outline-none',
            'data-[state=open]:animate-[ds-popover-in_120ms_ease] motion-reduce:animate-none',
            paddings[padding],
            className,
          )}
        >
          {children}
          <RadixPopover.Arrow className="fill-surface [&>path]:stroke-border" />
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
}
