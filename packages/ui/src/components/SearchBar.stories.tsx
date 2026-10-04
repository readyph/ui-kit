import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SearchBar } from './SearchBar';
import { ShortcutModeProvider } from '../providers/ShortcutModeProvider';

const meta: Meta<typeof SearchBar> = {
  parameters: { docs: { description: { component: `\`\`\`tsx
import { SearchBar } from '@readyph/ui';

<SearchBar value={q} onChange={setQ} placeholder="Search products…" />
\`\`\`` } } },
  title: 'Components/Search/SearchBar',
  component: SearchBar,
};
export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Basic: Story = {
  render: function BasicStory() {
    const [value, setValue] = useState('');
    return (
      <div className="w-96">
        <SearchBar value={value} onValueChange={setValue} placeholder="Search products…" />
        <p className="mt-2 text-xs text-ink-muted">Value: {value || '(empty)'}</p>
      </div>
    );
  },
};

export const Loading: Story = {
  render: () => (
    <div className="w-96">
      <SearchBar defaultValue="tangerine" loading />
    </div>
  ),
};

export const WithShortcut: Story = {
  render: () => (
    <ShortcutModeProvider defaultOn>
      <div className="w-96">
        <SearchBar shortcut="mod+k" placeholder="Search everything…" />
      </div>
    </ShortcutModeProvider>
  ),
};
