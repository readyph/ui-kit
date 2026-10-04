import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Envelope, Lock } from '@phosphor-icons/react';
import { Field } from './Field';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Select } from './Select';
import { Checkbox } from './Checkbox';
import { Switch } from './Switch';
import { RadioGroup } from './RadioGroup';
import { Form, FormActions } from './Form';
import { Button } from './Button';

const meta: Meta = {
  parameters: { docs: { description: { component: `The project owns submission; wire \`onSubmit\` to your API.

\`\`\`tsx
import { Form, Field, Input, Select, Button, FormActions } from '@readyph/ui';

<Form onSubmit={handleSubmit}>
  <Field label="Email">
    <Input type="email" name="email" />
  </Field>
  <FormActions>
    <Button type="submit">Save</Button>
  </FormActions>
</Form>
\`\`\`` } } },
  title: 'Components/Forms/Controls',
};
export default meta;
type Story = StoryObj;

export const Inputs: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-4">
      <Field label="Full name">
        <Input placeholder="Jane Dela Cruz" />
      </Field>
      <Field label="Email" hint="We'll never share it.">
        <Input type="email" placeholder="you@readyph.com" leftIcon={Envelope} />
      </Field>
      <Field label="Password" error="Must be at least 8 characters." required>
        <Input type="password" leftIcon={Lock} defaultValue="short" />
      </Field>
      <Field label="Disabled">
        <Input disabled defaultValue="Read only" />
      </Field>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-3">
      <Input inputSize="sm" placeholder="Small" />
      <Input inputSize="md" placeholder="Medium" />
      <Input inputSize="lg" placeholder="Large" />
    </div>
  ),
};

export const TextareaField: Story = {
  render: () => (
    <Field label="Notes" hint="Markdown supported." className="max-w-md">
      <Textarea placeholder="Add a note…" />
    </Field>
  ),
};

export const SelectField: Story = {
  render: function SelectStory() {
    const [value, setValue] = useState('manila');
    return (
      <Field label="Branch" className="max-w-xs">
        <Select
          value={value}
          onValueChange={setValue}
          options={[
            { value: 'manila', label: 'Manila' },
            { value: 'cebu', label: 'Cebu' },
            { value: 'davao', label: 'Davao' },
            { value: 'baguio', label: 'Baguio', disabled: true },
          ]}
        />
      </Field>
    );
  },
};

export const Checkboxes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox defaultChecked label="Email notifications" description="Order updates and receipts." />
      <Checkbox label="SMS notifications" />
      <Checkbox checked="indeterminate" label="Select all" />
      <Checkbox disabled label="Disabled option" />
    </div>
  ),
};

export const Switches: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Switch defaultChecked label="Auto-sync inventory" description="Every 5 minutes across branches." />
      <Switch label="Beta features" />
      <Switch disabled label="Disabled" />
    </div>
  ),
};

export const Radios: Story = {
  render: function RadioStory() {
    const [value, setValue] = useState('standard');
    return (
      <RadioGroup
        value={value}
        onValueChange={setValue}
        options={[
          { value: 'standard', label: 'Standard', description: 'Delivered in 3–5 days.' },
          { value: 'express', label: 'Express', description: 'Next business day.' },
          { value: 'pickup', label: 'Branch pickup', description: 'Ready in 2 hours.' },
        ]}
      />
    );
  },
};

export const FullForm: Story = {
  name: 'Form layout',
  render: () => (
    <Form className="max-w-md" onSubmit={(e) => e.preventDefault()}>
      <Field label="Product name" required>
        <Input placeholder="Tangerine crate" />
      </Field>
      <Field label="Category">
        <Select
          options={[
            { value: 'fruit', label: 'Fruit' },
            { value: 'veg', label: 'Vegetables' },
          ]}
          placeholder="Choose a category"
        />
      </Field>
      <Field label="Description" hint="Shown on the storefront.">
        <Textarea placeholder="Describe the product…" />
      </Field>
      <Checkbox label="Publish immediately" />
      <FormActions>
        <Button variant="subtle" type="button">
          Cancel
        </Button>
        <Button type="submit">Create product</Button>
      </FormActions>
    </Form>
  ),
};
