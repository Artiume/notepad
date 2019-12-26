import config from "../config.json"

export const CONFIG = config

export const ERRORS = {
  INVALID_AUTHORIZATION: {
    code: "authorization.invalid",
    message: "Invalid authorization header.",
  },
  MISSING_AUTHORIZATION: {
    code: "authorization.missing",
    message: "Authorization header missing or malformed.",
  },
  INVALID_CREDENTIALS: {
    code: "credentials.invalid",
    message: "Invalid authentication credentials.",
  },
  MISSING_CREDENTIALS: {
    code: "credentials.missing",
    message: "Authentication credentials missing or malformed.",
  },
  USER_EXISTS: {
    code: "user.exists",
    message: "User with that email already exists.",
  },
  USER_MALFORMED: {
    code: "user.malformed",
    message: "User is malformed or has missing fields.",
  },
  USER_NOT_FOUND: {
    code: "user.not_found",
    message: "Could not find user with that ID.",
  },
  ARTICLE_MALFORMED: {
    code: "article.malformed",
    message: "Article is malformed or has missing fields.",
  },
  ARTICLE_NOT_FOUND: {
    code: "article.not_found",
    message: "Could not find an article with that id.",
  },
  SERVER_ERROR: {
    code: "server.error",
    message: "There was an error on our end, please try again.",
  },
}
