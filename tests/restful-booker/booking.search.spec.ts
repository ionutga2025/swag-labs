import { test, expect } from "../../src/restful-booker/fixtures/auth.fixture";
import { validBooking } from "../../src/restful-booker/test-data/booking.data";

test.describe("Booking API - Search", () => {
  test("returns booking ids", async ({ bookingApi }) => {
    const response = await bookingApi.getBookings();

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);

    for (const booking of body) {
      expect(booking).toEqual({
        bookingid: expect.any(Number),
      });
    }
  });

  test("filters by firstname and lastname", async ({
    bookingApi,
    authToken,
  }) => {
    const createResponse = await bookingApi.createBooking(validBooking);
    expect(createResponse.status()).toBe(200);

    const { bookingid } = await createResponse.json();

    try {
      const response = await bookingApi.getBookings({
        firstname: validBooking.firstname,
        lastname: validBooking.lastname,
      });

      expect(response.status()).toBe(200);

      const body = await response.json();

      expect(
        body.some(
          (booking: { bookingid: number }) => booking.bookingid === bookingid,
        ),
      ).toBeTruthy();
    } finally {
      await bookingApi.deleteBooking(bookingid, authToken);
    }
  });

  test("filters by checkin and checkout dates", async ({ bookingApi }) => {
    const response = await bookingApi.getBookings({
      checkin: validBooking.bookingdates.checkin,
      checkout: validBooking.bookingdates.checkout,
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(Array.isArray(body)).toBeTruthy();

    for (const booking of body) {
      expect(booking).toEqual({
        bookingid: expect.any(Number),
      });
    }
  });
});
