import { test as base, expect } from "@playwright/test";
import { pagesFixture } from "./pages.fixtures";
import type { LoginPage } from "../../../src/swag-labs/pages/login.page";
import type { InventoryPage } from "../../../src/swag-labs/pages/inventory.page";
import type { CartPage } from "../../../src/swag-labs/pages/cart.page";

type Fixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
};

const ignoredErrors = [
  "Failed to load resource: the server responded with a status of 401",
  "Failed to load resource: the server responded with a status of 404 ()",
];

export const test = base.extend<Fixtures>({
  ...pagesFixture,

  page: async ({ page }, use) => {
    const errors: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() !== "error") return;

      const text = msg.text();

      const shouldIgnore = ignoredErrors.some((error) => text.includes(error));

      if (shouldIgnore) return;

      errors.push(`Console error: ${text}`);
    });

    page.on("pageerror", (error) => {
      errors.push(`Page error: ${error.message}`);
    });

    await use(page);

    expect(errors, `Browser errors:\n${errors.join("\n")}`).toEqual([]);
  },
});

export { expect };
