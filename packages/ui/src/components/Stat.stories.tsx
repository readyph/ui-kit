import type { Meta, StoryObj } from '@storybook/react';
import { ShoppingCart, CurrencyDollar, UsersThree, Package } from '@phosphor-icons/react';
import { Stat } from './Stat';
import { Sparkline } from './Sparkline';

const meta: Meta<typeof Stat> = {
  title: 'Components/Data display/Stat',
  component: Stat,
  parameters: {
    docs: {
      description: {
        component: [
          'A flat metric — label, big value, optional delta and trend `Sparkline`. No card chrome, so drop it into a grid, a row, or a panel.',
          '',
          '```tsx',
          "import { Stat } from '@readyph/ui';",
          "import { ShoppingCart } from '@phosphor-icons/react';",
          '',
          '<Stat icon={ShoppingCart} label="Orders" value="18" delta="+4" points={[6, 9, 7, 11, 8, 14, 18]} />',
          '```',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Stat>;

export const Grid: Story = {
  render: () => (
    <div className="grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6">
      <Stat icon={ShoppingCart} label="Orders" value="18" delta="+4 vs yesterday" points={[6, 9, 7, 11, 8, 14, 18]} sparklineTone="success" />
      <Stat icon={CurrencyDollar} label="Revenue" value="₱24.6k" delta="+12%" points={[12, 15, 13, 18, 16, 21, 25]} sparklineTone="success" />
      <Stat icon={UsersThree} label="Customers" value="342" points={[300, 310, 305, 320, 330, 335, 342]} />
      <Stat icon={Package} label="Low stock" value="7" delta="2 critical" deltaTone="error" points={[2, 3, 3, 5, 4, 6, 7]} sparklineTone="error" />
    </div>
  ),
};

export const Sparklines: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Sparkline points={[3, 6, 4, 8, 7, 10]} tone="primary" />
      <Sparkline points={[10, 8, 9, 6, 7, 4]} tone="error" />
      <Sparkline points={[2, 4, 3, 6, 8, 12]} tone="success" area />
    </div>
  ),
};
