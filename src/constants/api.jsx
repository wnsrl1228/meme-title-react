export const KAKAO_AUTH_API_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}`;
export const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;
export const SOCKET_URL = `${process.env.REACT_APP_SOCKET_URL}`;

export const HTTP_STATUS_CODE = {
    SUCCESS: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    CONTENT_TOO_LARGE: 413,
    INTERNAL_SERVER_ERROR: 500,
  };

export const ERROR_CODE = {
  EXPIRED_TOKEN: 4003,
  INVALID_TOKEN: 4002,
  INVALID_JWT_FORMAT: 5001
}