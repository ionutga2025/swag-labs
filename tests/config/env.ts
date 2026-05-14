type UserType =
  | "standard"
  | "locked"
  | "problem"
  | "performance"
  | "error"
  | "visual";

type TestUser = {
  username: string;
  password: string;
};

const requiredEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing env: ${key}`);
  return value;
};

const PASSWORD = requiredEnv("PASSWORD");

const usernameEnvMap: Record<UserType, string> = {
  standard: "STANDARD_USER",
  locked: "LOCKED_USER",
  problem: "PROBLEM_USER",
  performance: "PERFORMANCE_USER",
  error: "ERROR_USER",
  visual: "VISUAL_USER",
};

export const users: Record<UserType, TestUser> = Object.fromEntries(
  Object.entries(usernameEnvMap).map(([key, envKey]) => [
    key,
    {
      username: requiredEnv(envKey),
      password: PASSWORD,
    },
  ]),
) as Record<UserType, TestUser>;
