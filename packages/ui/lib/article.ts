import fetch from "isomorphic-unfetch"

const isServer = typeof window === "undefined"

export const article = (slug: string) =>
  fetch(isServer ? `http://localhost:3000/api/articles/${slug}` : `/api/articles/${slug}`)
