import { Locator } from "@playwright/test";
import { ProductDetails } from "../../models/product.model";

export class ProductCard {
  public readonly nameTitle: Locator;
  public readonly descriptionLabel: Locator;
  public readonly priceLabel: Locator;
  private readonly addToCartButton: Locator;
  private readonly removeButton: Locator;

  constructor(root: Locator) {
    this.nameTitle = root.getByTestId("inventory-item-name");
    this.descriptionLabel = root.getByTestId("inventory-item-desc");
    this.priceLabel = root.getByTestId("inventory-item-price");
    this.addToCartButton = root.getByRole("button", {
      name: /add to cart/i,
    });
    this.removeButton = root.getByRole("button", {
      name: /remove/i,
    });
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async getDetails(): Promise<ProductDetails> {
    return {
      name: await this.nameTitle.innerText(),
      description: await this.descriptionLabel.innerText(),
      price: await this.priceLabel.innerText(),
    };
  }
}
