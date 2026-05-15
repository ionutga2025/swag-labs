import { InventoryPage } from "../pages/inventory.page";
import { getRandomIndex } from "../../../utils/random.utils";
import { ProductDetails } from "../models/product.model";

export async function addRandomProductToCart(
  inventoryPage: InventoryPage,
): Promise<ProductDetails> {
  const products = await inventoryPage.getProducts();

  const randomIndex = getRandomIndex(products.length);
  const product = products[randomIndex];

  const details = await product.getDetails();

  await product.addToCart();

  return details;
}
