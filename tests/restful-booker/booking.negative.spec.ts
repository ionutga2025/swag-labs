import { test, expect } from "../../src/restful-booker/fixtures/auth.fixture";
import {
  validBooking,
  invalidBooking,
} from "../../src/restful-booker/test-data/booking.data";

test.describe("Booking API - Negative", () => {
  test("returns 404 for unknown booking id", async ({ bookingApi }) => {
    const response = await bookingApi.getBooking(999999999);

    expect(response.status()).toBe(404);
  });

  test("rejects delete without auth token", async ({
    bookingApi,
    authToken,
  }) => {
    const createResponse = await bookingApi.createBooking(validBooking);
    expect(createResponse.status()).toBe(200);

    const { bookingid } = await createResponse.json();

    try {
      const response = await bookingApi.deleteBooking(bookingid);

      expect(response.status()).toBe(403);
    } finally {
      await bookingApi.deleteBooking(bookingid, authToken);
    }
  });

  test("rejects full update without auth token", async ({
    bookingApi,
    authToken,
  }) => {
    const createResponse = await bookingApi.createBooking(validBooking);
    expect(createResponse.status()).toBe(200);

    const { bookingid } = await createResponse.json();

    try {
      const response = await bookingApi.updateBooking(bookingid, {
        ...validBooking,
        firstname: "Unauthorized",
      });

      expect(response.status()).toBe(403);
    } finally {
      await bookingApi.deleteBooking(bookingid, authToken);
    }
  });

  test("rejects partial update without auth token", async ({
    bookingApi,
    authToken,
  }) => {
    const createResponse = await bookingApi.createBooking(validBooking);
    expect(createResponse.status()).toBe(200);

    const { bookingid } = await createResponse.json();

    try {
      const response = await bookingApi.partialUpdateBooking(bookingid, {
        firstname: "Unauthorized",
      });

      expect(response.status()).toBe(403);
    } finally {
      await bookingApi.deleteBooking(bookingid, authToken);
    }
  });

  test("returns 500 for malformed payload", async ({ bookingApi }) => {
    const response =
      await bookingApi.createBookingWithInvalidPayload(invalidBooking);

    expect(response.status()).toBe(500);
  });
});
