import { test, expect } from "../../src/restful-booker/fixtures/auth.fixture";
import { validBooking } from "../../src/restful-booker/test-data/booking.data";

test.describe("Booking API", () => {
  test("creates a booking", async ({ bookingApi, authToken }) => {
    const response = await bookingApi.createBooking(validBooking);
    expect(response.status()).toBe(200);

    const body = await response.json();

    try {
      expect(body.bookingid).toEqual(expect.any(Number));
      expect(body.booking).toEqual(validBooking);
    } finally {
      await bookingApi.deleteBooking(body.bookingid, authToken);
    }
  });

  test("retrieves a booking by id", async ({ bookingApi, authToken }) => {
    const createResponse = await bookingApi.createBooking(validBooking);
    expect(createResponse.status()).toBe(200);

    const { bookingid } = await createResponse.json();

    try {
      const getResponse = await bookingApi.getBooking(bookingid);

      expect(getResponse.status()).toBe(200);
      expect(await getResponse.json()).toEqual(validBooking);
    } finally {
      await bookingApi.deleteBooking(bookingid, authToken);
    }
  });

  test("deletes a booking by id", async ({ bookingApi, authToken }) => {
    const createResponse = await bookingApi.createBooking(validBooking);
    expect(createResponse.status()).toBe(200);

    const { bookingid } = await createResponse.json();

    const deleteResponse = await bookingApi.deleteBooking(bookingid, authToken);

    expect(deleteResponse.status()).toBe(201);

    const getDeletedResponse = await bookingApi.getBooking(bookingid);

    expect(getDeletedResponse.status()).toBe(404);
  });
});
