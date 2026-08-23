import type { Preview } from '@storybook/react-vite';
import * as React from 'react';
import { TooltipProvider } from '../src/components/Tooltip/Tooltip';
import './preview.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Global theme for all stories',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
    brand: {
      description: 'Global brand for all stories',
      toolbar: {
        title: 'Brand',
        icon: 'paintbrush',
        items: [
          { value: 'velocity', title: 'Runcycl (Velocity)' },
          { value: 'runticket', title: 'Runticket' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
    brand: 'velocity',
  },
  decorators: [
    (Story, context) => {
      const theme = String(context.globals.theme ?? 'light');
      const brand = String(context.globals.brand ?? 'velocity');
      if (document.documentElement.getAttribute('data-theme') !== theme) {
        document.documentElement.setAttribute('data-theme', theme);
      }
      if (document.documentElement.getAttribute('data-brand') !== brand) {
        document.documentElement.setAttribute('data-brand', brand);
      }
      return React.createElement(
        TooltipProvider,
        { delay: 200 },
        React.createElement(Story),
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
  },
};

export default preview;
