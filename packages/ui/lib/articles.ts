import fetch from "isomorphic-unfetch"
import Cookies from "js-cookie"

const isServer = typeof window === "undefined"

export const articles = () => fetch(isServer ? "http://localhost:3000/api/articles" : "/api/articles")
export const createArticle = (title: string, content: string) =>
  fetch("/api/articles", {
    body: JSON.stringify({ title, content }),
    headers: {
      authorization: Cookies.get("token") ?? "",
      "Content-Type": "application/json",
    },
  })
