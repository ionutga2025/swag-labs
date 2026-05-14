import { test, expect } from "../../../src/swag-labs/fixtures/test.fixtures";
import { users } from "../../config/env";

const validUsers = [
  { name: "standard user", user: users.standard },
  { name: "problem user", user: users.problem },
  { name: "error user", user: users.error },
  { name: "visual user", user: users.visual },
];

test.describe("Login", () => {
  for (const { name, user } of validUsers) {
    test(`${name} can authenticate`, async ({ page, loginPage }) => {
      await loginPage.login(user.username, user.password);

      await expect(page).toHaveURL(/inventory/);
    });
  }

  test("locked out user cannot login", async ({ loginPage }) => {
    await loginPage.login(users.locked.username, users.locked.password);

    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Sorry, this user has been locked out.",
    );
  });

  test.describe("performance glitch user", () => {
    test.use({ checkConsoleErrors: false });

    test("can authenticate", async ({ page, loginPage }) => {
      await loginPage.login(
        users.performance.username,
        users.performance.password,
      );

      await expect(page).toHaveURL(/inventory/);
    });
  });
});
