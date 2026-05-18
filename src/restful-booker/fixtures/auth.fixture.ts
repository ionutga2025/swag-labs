import { test as base, expect } from "@playwright/test";
import { BookingApi } from "../api/booking.api";
import { AuthApi } from "../api/auth.api";

type ApiFixtures = {
  bookingApi: BookingApi;
  authToken: string;
};

export const test = base.extend<ApiFixtures>({
  bookingApi: async ({ request }, use) => {
    await use(new BookingApi(request));
  },

  authToken: async ({ request }, use) => {
    const authApi = new AuthApi(request);
    const response = await authApi.createToken();

    expect(response.status()).toBe(200);

    const body = await response.json();
    await use(body.token);
  },
});

export { expect };
