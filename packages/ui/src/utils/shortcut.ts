/**
 * Format a shortcut string like `"mod+k"` or `"shift+?"` into display tokens
 * for `<Kbd>` chips. `mod` renders as ⌘ on Apple platforms, Ctrl elsewhere.
 * Display only — the package never binds the key.
 */
const isApple =
  typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.platform);

const SYMBOLS: Record<string, string> = {
  mod: isApple ? '⌘' : 'Ctrl',
  cmd: '⌘',
  meta: '⌘',
  ctrl: 'Ctrl',
  alt: isApple ? '⌥' : 'Alt',
  option: '⌥',
  shift: isApple ? '⇧' : 'Shift',
  enter: '↵',
  escape: 'Esc',
  esc: 'Esc',
  arrowup: '↑',
  arrowdown: '↓',
  arrowleft: '←',
  arrowright: '→',
};

export function formatShortcut(shortcut: string): string[] {
  return shortcut
    .split('+')
    .map((raw) => raw.trim())
    .filter(Boolean)
    .map((part) => SYMBOLS[part.toLowerCase()] ?? (part.length === 1 ? part.toUpperCase() : part));
}
