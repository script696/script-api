const REFRESH_TOKEN = 'refreshToken';
const REFRESH_TOKEN_EXPIRES_TIME = 24 * 60 * 60 * 15 * 1000;

const COOKIE_CONFIG = {
  maxAge: REFRESH_TOKEN_EXPIRES_TIME,
  httpOnly: true,
  path: '/',
};
export { REFRESH_TOKEN, COOKIE_CONFIG };
