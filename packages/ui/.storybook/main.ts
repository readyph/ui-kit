import type { StorybookConfig } from '@storybook/react-vite';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  core: {
    disableTelemetry: true,
  },
  async viteFinal(cfg) {
    const { mergeConfig } = await import('vite');
    // Resolve the bare `@readyph/design-tokens` specifier to source so Storybook
    // runs without building the tokens package first. The `/preset` and
    // `/theme.css` subpaths keep resolving through the package's own exports.
    return mergeConfig(cfg, {
      resolve: {
        alias: [
          {
            find: /^@readyph\/design-tokens$/,
            replacement: resolve(dir, '../../design-tokens/src/index.ts'),
          },
        ],
      },
    });
  },
};

export default config;
