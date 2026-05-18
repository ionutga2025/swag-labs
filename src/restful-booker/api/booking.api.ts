import { APIRequestContext, APIResponse } from "@playwright/test";
import {
  BookingFilters,
  BookingPayload,
  InvalidBookingPayload,
} from "../models/booking.model";

export class BookingApi {
  private readonly basePath = "/booking";

  constructor(private readonly request: APIRequestContext) {}

  private jsonHeaders(token?: string): Record<string, string> {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token && { Cookie: `token=${token}` }),
    };
  }

  private authHeaders(token?: string): Record<string, string> | undefined {
    return token ? { Cookie: `token=${token}` } : undefined;
  }

  async ping(): Promise<APIResponse> {
    return this.request.get("/ping");
  }

  async createBooking(payload: BookingPayload): Promise<APIResponse> {
    return this.request.post(this.basePath, {
      data: payload,
      headers: this.jsonHeaders(),
    });
  }

  async createBookingWithInvalidPayload(
    payload: InvalidBookingPayload,
  ): Promise<APIResponse> {
    return this.request.post(this.basePath, {
      data: payload,
      headers: this.jsonHeaders(),
    });
  }

  async getBookings(filters?: BookingFilters): Promise<APIResponse> {
    return this.request.get(this.basePath, {
      params: filters,
      headers: {
        Accept: "application/json",
      },
    });
  }

  async getBooking(bookingId: number): Promise<APIResponse> {
    return this.request.get(`${this.basePath}/${bookingId}`, {
      headers: {
        Accept: "application/json",
      },
    });
  }

  async updateBooking(
    bookingId: number,
    payload: BookingPayload,
    token?: string,
  ): Promise<APIResponse> {
    return this.request.put(`${this.basePath}/${bookingId}`, {
      data: payload,
      headers: this.jsonHeaders(token),
    });
  }

  async partialUpdateBooking(
    bookingId: number,
    payload: Partial<BookingPayload>,
    token?: string,
  ): Promise<APIResponse> {
    return this.request.patch(`${this.basePath}/${bookingId}`, {
      data: payload,
      headers: this.jsonHeaders(token),
    });
  }

  async deleteBooking(bookingId: number, token?: string): Promise<APIResponse> {
    return this.request.delete(`${this.basePath}/${bookingId}`, {
      headers: this.authHeaders(token),
    });
  }
}
