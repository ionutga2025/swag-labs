import { BookingPayload, InvalidBookingPayload } from "../models/booking.model";

export const validBooking: BookingPayload = {
  firstname: "John",
  lastname: "Doe",
  totalprice: 150,
  depositpaid: true,
  bookingdates: {
    checkin: "2014-03-13",
    checkout: "2014-05-21",
  },
  additionalneeds: "Breakfast",
};

export const invalidBooking: InvalidBookingPayload = {
  firstname: 123,
  lastname: null,
  totalprice: "invalid",
  depositpaid: "yes",
  bookingdates: {
    checkin: "not-a-date",
    checkout: false,
  },
  additionalneeds: [],
};
