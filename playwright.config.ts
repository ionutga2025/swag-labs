import { defineConfig, devices } from "@playwright/test";
import "dotenv/config";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 1,
  reporter: [["html", { outputFolder: "playwright-report", open: "never" }]],
  use: {
    trace: "on-first-retry",
    testIdAttribute: "data-test",
  },

  projects: [
    {
      name: "swag-labs",
      testDir: "./tests/swag-labs",
      use: {
        ...devices["Desktop Chrome"],
        headless: process.env.CI ? true : false,
        launchOptions: {
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
        },
        trace: "on-first-retry",
        video: "retain-on-failure",
        screenshot: "only-on-failure",
        baseURL: "https://www.saucedemo.com",
      },
    },

    /*    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    }, */
  ],
});
