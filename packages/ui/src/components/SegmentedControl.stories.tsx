import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SquaresFour, Rows, CalendarBlank } from '@phosphor-icons/react';
import { SegmentedControl } from './SegmentedControl';

const meta: Meta<typeof SegmentedControl> = {
  title: 'Components/Navigation/SegmentedControl',
  component: SegmentedControl,
  parameters: {
    docs: {
      description: {
        component: [
          'A single-select pill group — for compact view or filter toggles. Controlled (`value` + `onChange`) or uncontrolled (`defaultValue`).',
          '',
          '```tsx',
          "import { SegmentedControl } from '@readyph/ui';",
          '',
          'const [view, setView] = useState("grid");',
          '<SegmentedControl',
          '  value={view}',
          '  onChange={setView}',
          '  options={[{ value: "grid", label: "Grid" }, { value: "list", label: "List" }]}',
          '/>',
          '```',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof SegmentedControl>;

export const Default: Story = {
  render: function DefaultExample() {
    const [view, setView] = useState('grid');
    return (
      <div className="flex flex-col gap-3">
        <SegmentedControl
          value={view}
          onChange={setView}
          aria-label="View"
          options={[
            { value: 'grid', label: 'Grid', icon: SquaresFour },
            { value: 'list', label: 'List', icon: Rows },
            { value: 'calendar', label: 'Calendar', icon: CalendarBlank },
          ]}
        />
        <p className="text-xs text-ink-muted">Selected: {view}</p>
      </div>
    );
  },
};

export const TextOnly: Story = {
  render: () => (
    <SegmentedControl
      defaultValue="week"
      size="sm"
      options={[
        { value: 'day', label: 'Day' },
        { value: 'week', label: 'Week' },
        { value: 'month', label: 'Month' },
      ]}
    />
  ),
};
