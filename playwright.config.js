// @ts-check
const { devices } = require('@playwright/test');


/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: './tests',
 
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    browserName : 'chromium',
    headless : false,
    screenshot:'on',
    trace:'retain-on-failure',
  },
};
module.exports = config;
