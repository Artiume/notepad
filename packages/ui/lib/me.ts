import fetch from "isomorphic-unfetch"

const isServer = typeof window === "undefined"

export const me = (token: string) =>
  fetch(isServer ? "http://localhost:3000/api/users/me" : "/api/users/me", {
    headers: { authorization: token },
  })
