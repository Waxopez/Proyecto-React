import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function(config) {
  config.set({
    basePath: path.resolve(__dirname),

    frameworks: ['jasmine'],

    files: [
      { pattern: 'src/setupTests.js', type: 'module' },
      { pattern: 'src/**/*.test.{js,jsx,ts,tsx}', type: 'module' }
    ],

    reporters: ['progress', 'coverage'],

    coverageReporter: {
      dir: path.resolve(__dirname, 'coverage'),
      reporters: [{ type: 'html' }, { type: 'text-summary' }]
    },

    browsers: ['ChromeHeadless'],

    singleRun: true
  });
}
