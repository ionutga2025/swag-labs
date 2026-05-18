import { defineConfig, devices } from "@playwright/test";
import "dotenv/config";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: [
    ["github"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],
  use: {
    trace: "on-first-retry",
    testIdAttribute: "data-test",
  },

  projects: [
    {
      name: "swag-labs",
      testDir: "./tests/swag-labs",
      workers: 1,
      use: {
        ...devices["Desktop Chrome"],
        headless: process.env.CI ? true : false,
        launchOptions: {
          args: ["--no-sandbox", "--disable-dev-shm-usage"],
        },
        trace: "on-first-retry",
        video: "retain-on-failure",
        screenshot: "only-on-failure",
        baseURL: "https://www.saucedemo.com",
      },
    },
    {
      name: "restful-booker",
      testMatch: /.*restful-booker.*\.spec\.ts/,
      workers: process.env.CI ? 4 : undefined,
      use: {
        baseURL: process.env.API_BASE_URL,
      },
    },
  ],
});
