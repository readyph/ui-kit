import { useState, type ReactNode } from 'react';
import { CaretDown } from '@phosphor-icons/react';
import { cn, focusRing } from '../utils/cn';
import { Icon } from './Icon';

export interface AccordionItemDef {
  value: string;
  title: ReactNode;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItemDef[];
  /** `single` keeps one panel open; `multiple` allows many. */
  type?: 'single' | 'multiple';
  /** Values open initially. */
  defaultOpen?: string[];
  className?: string;
}

/** Collapsible sections. Lightweight and keyboard-operable (native buttons). */
export function Accordion({ items, type = 'single', defaultOpen = [], className }: AccordionProps) {
  const [open, setOpen] = useState<string[]>(defaultOpen);
  const toggle = (value: string) => {
    setOpen((prev) => {
      const isOpen = prev.includes(value);
      if (type === 'single') return isOpen ? [] : [value];
      return isOpen ? prev.filter((v) => v !== value) : [...prev, value];
    });
  };
  return (
    <div className={cn('divide-y divide-border overflow-hidden rounded-xl border border-border', className)}>
      {items.map((item) => {
        const isOpen = open.includes(item.value);
        return (
          <div key={item.value}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggle(item.value)}
              className={cn('flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-ink hover:bg-surface-muted', focusRing)}
            >
              {item.title}
              <Icon
                icon={CaretDown}
                size="sm"
                className={cn('shrink-0 text-ink-subtle transition-transform duration-DEFAULT', isOpen && 'rotate-180')}
              />
            </button>
            {isOpen && <div className="px-4 pb-4 text-sm leading-relaxed text-ink-muted">{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
}
