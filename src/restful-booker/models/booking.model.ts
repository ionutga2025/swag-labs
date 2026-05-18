export interface BookingDates {
  checkin: string;
  checkout: string;
}

export interface BookingPayload {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
  additionalneeds: string;
}

export interface InvalidBookingPayload {
  firstname?: unknown;
  lastname?: unknown;
  totalprice?: unknown;
  depositpaid?: unknown;
  bookingdates?: {
    checkin?: unknown;
    checkout?: unknown;
  };
  additionalneeds?: unknown;
}

export type BookingFilters = Partial<
  Record<"firstname" | "lastname" | "checkin" | "checkout", string>
>;
