const REFRESH_TOKEN = 'refreshToken';
const REFRESH_TOKEN_EXPIRES_TIME = 7 * 24 * 60 * 60;

const COOKIE_CONFIG = {
  maxAge: REFRESH_TOKEN_EXPIRES_TIME,
  httpOnly: true,
  path: '/',
};
export { REFRESH_TOKEN, COOKIE_CONFIG };
