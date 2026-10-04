import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { OffCanvas } from './Drawer';
import { Button } from './Button';
import { Field } from './Field';
import { Input } from './Input';

const meta: Meta<typeof OffCanvas> = {
  title: 'Components/Overlays/Off-canvas',
  component: OffCanvas,
  parameters: {
    docs: {
      description: {
        component: [
          'An off-canvas side panel (focus trap, Esc to close) built on Radix Dialog. Exported as `OffCanvas` (and `Drawer`). Compose the regions with `OffCanvas.Header`, `OffCanvas.Body`, `OffCanvas.Footer`, or use the quick `title`/`footer` props. Slides from the `right` (default) or `left`.',
          '',
          '```tsx',
          "import { OffCanvas, Button, Field, Input } from '@readyph/ui';",
          '',
          'function Filters() {',
          '  const [open, setOpen] = useState(false);',
          '  return (',
          '    <>',
          '      <Button onClick={() => setOpen(true)}>Filters</Button>',
          '      <OffCanvas open={open} onOpenChange={setOpen} side="right">',
          '        <OffCanvas.Header>Filters</OffCanvas.Header>',
          '        <OffCanvas.Body>',
          '          <Field label="Keyword"><Input placeholder="Search…" /></Field>',
          '        </OffCanvas.Body>',
          '        <OffCanvas.Footer>',
          '          <Button onClick={() => setOpen(false)}>Apply</Button>',
          '        </OffCanvas.Footer>',
          '      </OffCanvas>',
          '    </>',
          '  );',
          '}',
          '```',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof OffCanvas>;

export const Composed: Story = {
  name: 'Header / content / footer',
  render: function ComposedExample() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open filters</Button>
        <OffCanvas open={open} onOpenChange={setOpen}>
          <OffCanvas.Header>Filters</OffCanvas.Header>
          <OffCanvas.Body>
            <div className="flex flex-col gap-4">
              <Field label="Keyword">
                <Input placeholder="Search…" />
              </Field>
              <Field label="Minimum stock">
                <Input type="number" defaultValue={10} />
              </Field>
            </div>
          </OffCanvas.Body>
          <OffCanvas.Footer>
            <Button variant="subtle" onClick={() => setOpen(false)}>
              Reset
            </Button>
            <Button onClick={() => setOpen(false)}>Apply</Button>
          </OffCanvas.Footer>
        </OffCanvas>
      </>
    );
  },
};

export const LeftSide: Story = {
  name: 'Left side',
  render: function LeftExample() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Open menu
        </Button>
        <OffCanvas open={open} onOpenChange={setOpen} side="left" width="18rem">
          <OffCanvas.Header>Menu</OffCanvas.Header>
          <OffCanvas.Body>Navigation or secondary content goes here.</OffCanvas.Body>
        </OffCanvas>
      </>
    );
  },
};
