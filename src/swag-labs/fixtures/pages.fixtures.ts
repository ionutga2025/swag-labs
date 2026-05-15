import type { PlaywrightTestArgs } from "@playwright/test";
import { LoginPage } from "../../../src/swag-labs/pages/login.page";
import { InventoryPage } from "../../../src/swag-labs/pages/inventory.page";
import { CartPage } from "../../../src/swag-labs/pages/cart.page";

export const pagesFixture = {
  loginPage: async (
    { page }: PlaywrightTestArgs,
    use: (lp: LoginPage) => Promise<void>,
  ) => {
    const loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    await use(loginPage);
  },
  inventoryPage: async (
    { page }: PlaywrightTestArgs,
    use: (lp: InventoryPage) => Promise<void>,
  ) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },
  cartPage: async (
    { page }: PlaywrightTestArgs,
    use: (lp: CartPage) => Promise<void>,
  ) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
};
