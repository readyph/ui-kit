import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';

const items = [
  { value: 'delivery', title: 'Do you deliver?', content: 'Yes — within Metro Manila, same-day for orders placed before 2 PM.' },
  { value: 'returns', title: 'Can I return items?', content: 'Fresh produce can be returned within 24 hours with a valid receipt.' },
  { value: 'bulk', title: 'Do you take bulk orders?', content: 'Yes, for 20+ units — message us and Leda prepares a quote.' },
];

const meta: Meta<typeof Accordion> = {
  title: 'Components/Data display/Accordion',
  component: Accordion,
  args: { items, type: 'single', defaultOpen: ['delivery'] },
  argTypes: { type: { control: 'inline-radio', options: ['single', 'multiple'] } },
  parameters: {
    docs: {
      description: {
        component: [
          'Collapsible sections. `single` keeps one panel open; `multiple` allows many.',
          '',
          '```tsx',
          "import { Accordion } from '@readyph/ui';",
          '',
          '<Accordion',
          '  type="single"',
          '  defaultOpen={["a"]}',
          '  items={[{ value: "a", title: "Question", content: "Answer" }]}',
          '/>',
          '```',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Accordion>;

export const Playground: Story = {
  render: (args) => (
    <div className="max-w-lg">
      <Accordion {...args} />
    </div>
  ),
};
