export const KAKAO_AUTH_API_URL = "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=5e126202c18a4006a3db7a30a84fadb4&redirect_uri=http://localhost:3000/login/kakao";
export const BASE_URL = "http://localhost:8080";

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