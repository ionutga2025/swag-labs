import { APIRequestContext, APIResponse } from "@playwright/test";

export class AuthApi {
  constructor(private readonly request: APIRequestContext) {}

  async createToken(): Promise<APIResponse> {
    const username = process.env.BOOKER_USERNAME;
    const password = process.env.BOOKER_PASSWORD;

    if (!username || !password) {
      throw new Error(
        "Missing BOOKER_USERNAME or BOOKER_PASSWORD env variables",
      );
    }

    return this.request.post("/auth", {
      data: {
        username,
        password,
      },
    });
  }
}
