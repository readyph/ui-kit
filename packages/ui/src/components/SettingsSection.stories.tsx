import type { Meta, StoryObj } from '@storybook/react';
import { SettingsSection } from './SettingsSection';
import { Field } from './Field';
import { Input } from './Input';
import { Switch } from './Switch';
import { Select } from './Select';
import { Button } from './Button';

const meta: Meta<typeof SettingsSection> = {
  parameters: {
    docs: {
      description: {
        component: `A titled settings block: a heading/description column beside its controls. Stacks on small screens.

\`\`\`tsx
import { SettingsSection, Field, Input } from '@readyph/ui';

<SettingsSection title="Profile" description="Your personal details.">
  <Field label="Display name"><Input /></Field>
</SettingsSection>
\`\`\``,
      },
    },
  },
  title: 'Components/Layout/SettingsSection',
  component: SettingsSection,
};
export default meta;
type Story = StoryObj<typeof SettingsSection>;

export const Basic: Story = {
  render: () => (
    <div className="max-w-3xl">
      <SettingsSection title="Profile" description="Your personal details.">
        <Field label="Display name">
          <Input defaultValue="Maria Santos" />
        </Field>
        <Field label="Timezone">
          <Select
            defaultValue="manila"
            options={[
              { value: 'manila', label: 'Asia/Manila' },
              { value: 'tokyo', label: 'Asia/Tokyo' },
            ]}
          />
        </Field>
      </SettingsSection>
      <SettingsSection
        title="Notifications"
        description="How we reach you."
        actions={<Button size="sm">Save</Button>}
      >
        <Switch defaultChecked label="Email receipts" />
        <Switch label="Weekly summary" />
      </SettingsSection>
    </div>
  ),
};
