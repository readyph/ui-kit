import type { Meta, StoryObj } from '@storybook/react';
import { FloppyDisk, MagnifyingGlass } from '@phosphor-icons/react';
import { Kbd } from './Kbd';
import { Button } from './Button';
import { SearchBar } from './SearchBar';
import { ShortcutModeProvider, useShortcutMode } from '../providers/ShortcutModeProvider';
import { Switch } from './Switch';

const meta: Meta = {
  title: 'Foundations/Shortcuts',
};
export default meta;
type Story = StoryObj;

export const Keycaps: Story = {
  render: () => (
    <div className="flex items-center gap-4 text-sm text-ink">
      <span className="flex items-center gap-1">
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd> Search
      </span>
      <span className="flex items-center gap-1">
        <Kbd>⌘</Kbd>
        <Kbd>S</Kbd> Save
      </span>
      <span className="flex items-center gap-1">
        <Kbd>Esc</Kbd> Close
      </span>
      <span className="flex items-center gap-1">
        <Kbd size="sm">?</Kbd> Help
      </span>
    </div>
  ),
};

function ShortcutDemo() {
  const { shortcutMode, toggleShortcutMode } = useShortcutMode();
  return (
    <div className="flex flex-col gap-4">
      <Switch checked={shortcutMode} onCheckedChange={toggleShortcutMode} label="Shortcut hint mode" />
      <div className="flex flex-wrap items-center gap-3">
        <Button leftIcon={FloppyDisk} shortcut="mod+s">
          Save
        </Button>
        <Button variant="secondary" leftIcon={MagnifyingGlass} shortcut="mod+k">
          Search
        </Button>
        <div className="w-72">
          <SearchBar shortcut="/" placeholder="Search…" />
        </div>
      </div>
      <p className="text-xs text-ink-muted">
        Toggle the switch — key hints appear and disappear without shifting layout. The package renders
        the affordance; the app binds the key.
      </p>
    </div>
  );
}

export const Mode: Story = {
  name: 'Shortcut mode',
  render: () => (
    <ShortcutModeProvider>
      <ShortcutDemo />
    </ShortcutModeProvider>
  ),
};
