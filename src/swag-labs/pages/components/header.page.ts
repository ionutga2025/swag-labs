import { Locator, Page } from "@playwright/test";

export class HeaderPage {
  private readonly burgerMenuButton: Locator;
  private readonly logo: Locator;
  private readonly shoppingCartButton: Locator;

  constructor(page: Page) {
    this.burgerMenuButton = page.getByTestId("open-menu");
    this.logo = page.locator(".app_logo");
    this.shoppingCartButton = page.getByTestId("shopping-cart-link");
  }

  async goToCart(): Promise<void> {
    await this.shoppingCartButton.click();
  }
}
