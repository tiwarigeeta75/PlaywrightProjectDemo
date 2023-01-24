// @ts-check
const { devices } = require('@playwright/test');


/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: './tests',
  retries:1,
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

projects:
[
  {
    name:'firefox executution',
    use:
    {
      browserName : 'firefox',
      headless : true,
      screenshot:'on',
      trace:'retain-on-failure',
    },
  },
  {
    name:'chrome executution',
    use:
    {
      browserName : 'chromium',
      headless : false,
      screenshot:'on',
      trace:'retain-on-failure',
     // viewport:{width:720,height:720},
      ignoreHTTPSErrors:true,
      video:'retain-on-failure'
      
    }
  }
]  
};
module.exports = config;


// to run custom playwright config file 
// npx playwright test file.spec.js --config playwright.config1.js
//to run selected project from configuration file
//use command   npx playwright test tests/UIBasicsAssignmentonePO.spec.js --config playwright.config1.js --project='firefox executution'

/*to generate allure report
run below commands
npx playwright test --reporter=line,allure-playwright
to get reports in readable format 
*/
