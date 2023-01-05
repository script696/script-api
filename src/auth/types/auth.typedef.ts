export type ValidateUserResponse = {
  id: number;
  email: string;
  username: string;
};

export type LoginServiceParams = {
  email: string;
  id: number;
};

export type LoginServiceResponse = {
  accessToken: string;
  refreshToken: string;
};

export type RefreshServiceParams = {
  email: string;
  sub: number;
};

export type RefreshResponse = LoginServiceResponse;
