import { test, expect } from "../../../src/swag-labs/fixtures/test.fixtures";
import { users } from "../../config/env";

const invalidLoginCases = [
  {
    name: "username and password are missing",
    username: "",
    password: "",
    expectedError: "Epic sadface: Username is required",
  },
  {
    name: "username is missing",
    username: "",
    password: users.standard.password,
    expectedError: "Epic sadface: Username is required",
  },
  {
    name: "password is missing",
    username: users.standard.username,
    password: "",
    expectedError: "Epic sadface: Password is required",
  },
  {
    name: "credentials are invalid",
    username: "invalid_user",
    password: "invalid_password",
    expectedError:
      "Epic sadface: Username and password do not match any user in this service",
  },
];

test.describe("Login validations", () => {
  for (const { name, username, password, expectedError } of invalidLoginCases) {
    test(`shows error when ${name}`, async ({ loginPage }) => {
      await loginPage.login(username, password);

      await expect(loginPage.errorMessage).toHaveText(expectedError);
    });
  }
});

test.describe("Unauthenticated user", () => {
  test.use({ checkConsoleErrors: false });

  test("cannot access inventory directly", async ({ page, loginPage }) => {
    await page.goto("/inventory.html");

    await expect(page).toHaveURL("/");
    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: You can only access '/inventory.html' when you are logged in.",
    );
  });
});
