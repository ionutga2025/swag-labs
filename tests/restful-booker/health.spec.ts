import { test, expect } from "../../src/restful-booker/fixtures/auth.fixture";

test.describe("Health Check", () => {
  test("returns healthy status", async ({ bookingApi }) => {
    const response = await bookingApi.ping();

    expect(response.status()).toBe(201);
  });
});
