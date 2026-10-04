import { useEffect, useRef } from 'react';

export type HotkeyMap = Record<string, (event: KeyboardEvent) => void>;

export interface UseHotkeysOptions {
  /** Disable all bindings. */
  enabled?: boolean;
  /** Node to bind to (defaults to window). */
  target?: HTMLElement | null;
}

function normalize(event: KeyboardEvent): string {
  const parts: string[] = [];
  if (event.metaKey) parts.push('mod');
  else if (event.ctrlKey) parts.push('mod');
  if (event.altKey) parts.push('alt');
  if (event.shiftKey) parts.push('shift');
  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key.toLowerCase();
  if (!['control', 'meta', 'alt', 'shift'].includes(key)) parts.push(key);
  return parts.join('+');
}

/**
 * Convenience helper for the *project* to bind real key handlers. The design
 * system never binds keys itself — this is a thin optional utility so apps can
 * register a keymap. Combos use `mod` for ⌘/Ctrl, e.g. `'mod+k'`, `'mod+shift+p'`,
 * `'escape'`, `'?'`.
 */
export function useHotkeys(map: HotkeyMap, options: UseHotkeysOptions = {}): void {
  const { enabled = true, target } = options;
  const mapRef = useRef(map);
  mapRef.current = map;

  useEffect(() => {
    if (!enabled) return;
    const node: HTMLElement | Window = target ?? window;
    const handler = (event: Event) => {
      const combo = normalize(event as KeyboardEvent);
      const fn = mapRef.current[combo];
      if (fn) fn(event as KeyboardEvent);
    };
    node.addEventListener('keydown', handler);
    return () => node.removeEventListener('keydown', handler);
  }, [enabled, target]);
}
