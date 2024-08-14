export const accessTokenSecret = process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET;
export const refreshTokensecret = process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET;

export const ACCESS_TOKEN_SECRET_KEY = new TextEncoder().encode(
  accessTokenSecret
);
export const REFRESH_TOKEN_SECRET_KEY = new TextEncoder().encode(
  refreshTokensecret
);
