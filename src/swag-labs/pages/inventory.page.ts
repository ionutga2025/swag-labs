import { Locator, Page } from "@playwright/test";

export class InventoryPage {
  private readonly page: Page;
  public readonly logo: Locator;
  public readonly productsLabel: Locator;
  public readonly productGrid: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator(".app_logo");
    this.productsLabel = page.getByTestId("title");
    this.productGrid = page.getByTestId("inventory-list");
  }
}
