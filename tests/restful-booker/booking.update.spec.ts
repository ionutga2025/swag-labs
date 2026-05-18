import { test, expect } from "../../src/restful-booker/fixtures/auth.fixture";
import { validBooking } from "../../src/restful-booker/test-data/booking.data";

test.describe("Booking API - Update", () => {
  test("updates a booking", async ({ bookingApi, authToken }) => {
    const createResponse = await bookingApi.createBooking(validBooking);
    expect(createResponse.status()).toBe(200);

    const { bookingid } = await createResponse.json();

    try {
      const updatedBooking = {
        ...validBooking,
        firstname: "Updated",
        lastname: "User",
        totalprice: 250,
      };

      const response = await bookingApi.updateBooking(
        bookingid,
        updatedBooking,
        authToken,
      );

      expect(response.status()).toBe(200);
      expect(await response.json()).toEqual(updatedBooking);
    } finally {
      await bookingApi.deleteBooking(bookingid, authToken);
    }
  });

  test("partially updates a booking", async ({ bookingApi, authToken }) => {
    const createResponse = await bookingApi.createBooking(validBooking);
    expect(createResponse.status()).toBe(200);

    const { bookingid } = await createResponse.json();

    try {
      const response = await bookingApi.partialUpdateBooking(
        bookingid,
        {
          firstname: "Partial",
          totalprice: 300,
        },
        authToken,
      );

      expect(response.status()).toBe(200);

      const body = await response.json();

      expect(body.firstname).toBe("Partial");
      expect(body.totalprice).toBe(300);
      expect(body.lastname).toBe(validBooking.lastname);
      expect(body.bookingdates).toEqual(validBooking.bookingdates);
    } finally {
      await bookingApi.deleteBooking(bookingid, authToken);
    }
  });
});
