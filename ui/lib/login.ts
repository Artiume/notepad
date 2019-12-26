import fetch from "isomorphic-unfetch"
const isServer = typeof window === "undefined"

export const login = (email: string, password: string) =>
  fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
