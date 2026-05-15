import { expect, test } from "../../../../src/swag-labs/fixtures/test.fixtures";
import { users } from "../../../config/env";
import { addRandomProductToCart } from "../../../../src/swag-labs/helpers/cart.helper";

test.describe("Cart", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test("user sees the added product details in the cart", async ({
    inventoryPage,
    cartPage,
  }) => {
    const addedProduct = await addRandomProductToCart(inventoryPage);

    await inventoryPage.pageHeader.goToCart();

    const cartItems = await cartPage.getCartItems();

    expect(cartItems).toHaveLength(1);

    const cartProduct = cartItems[0];
    await expect(cartProduct.nameTitle).toHaveText(addedProduct.name);
    await expect(cartProduct.priceLabel).toHaveText(addedProduct.price);
    await expect(cartProduct.descriptionLabel).toHaveText(
      addedProduct.description,
    );
  });
});
