import fetch from "isomorphic-unfetch"

const isServer = typeof window === "undefined"

export const articles = () =>
  fetch(isServer ? "http://localhost:3000/api/articles" : "/api/articles")
