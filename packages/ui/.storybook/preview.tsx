import type { Preview } from '@storybook/react';
import '../src/styles/globals.css';

/**
 * Enable autodocs for every story. Each story then gets a "Docs" page with a
 * rendered example AND its React source ("Show code"), which is how consumers
 * see how to implement the component.
 */
export const tags = ['autodocs'];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    backgrounds: {
      default: 'canvas',
      values: [
        { name: 'canvas', value: '#ececed' },
        { name: 'surface', value: '#ffffff' },
      ],
    },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Foundations',
          ['Colors', 'Typography', 'Spacing', 'Radius', 'Shadows', 'Icons'],
          'Components',
          'Portal',
          'Inventory',
          'Patterns',
        ],
      },
    },
  },
  decorators: [
    // Full-screen page templates render edge-to-edge; everything else gets padding.
    (Story, context) =>
      context.parameters.layout === 'fullscreen' ? (
        <Story />
      ) : (
        <div className="ds-root p-6 text-ink font-sans">
          <Story />
        </div>
      ),
  ],
};

export default preview;
