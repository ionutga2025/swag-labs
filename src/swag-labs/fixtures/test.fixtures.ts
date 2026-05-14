import { test as base, expect } from "@playwright/test";
import { pagesFixture } from "./pages.fixtures";
import type { LoginPage } from "../../../src/swag-labs/pages/login.page";
import type { InventoryPage } from "../../../src/swag-labs/pages/inventory.page";

type Fixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
};

type Options = {
  checkConsoleErrors: boolean;
};

export const test = base.extend<Fixtures & Options>({
  ...pagesFixture,

  checkConsoleErrors: [true, { option: true }],

  page: async ({ page, checkConsoleErrors }, use) => {
    const errors: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(`Console error: ${msg.text()}`);
      }
    });

    page.on("pageerror", (error) => {
      errors.push(`Page error: ${error.message}`);
    });

    await use(page);

    if (checkConsoleErrors) {
      expect(errors, `Browser errors:\n${errors.join("\n")}`).toEqual([]);
    }
  },
});

export { expect };
