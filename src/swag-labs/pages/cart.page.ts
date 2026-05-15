import { Locator, Page } from "@playwright/test";
import { HeaderPage } from "./components/header.page";
import { ProductCard } from "./components/product-item.card";

export class CartPage {
  readonly pageHeader: HeaderPage;
  readonly yourCartLabel: Locator;

  constructor(private readonly page: Page) {
    this.pageHeader = new HeaderPage(page);
    this.yourCartLabel = page.getByTestId("title");
  }

  async getCartItems(): Promise<ProductCard[]> {
    const items = await this.page.getByTestId("inventory-item").all();

    return items.map((item) => new ProductCard(item));
  }
}
