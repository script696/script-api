export type GetTokensParams = {
  email: string;
  sub: number;
};
export type GetTokensResponse = {
  accessToken: string;
  refreshToken: string;
};
