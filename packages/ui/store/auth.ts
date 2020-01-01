// External
import Cookies from "js-cookie"
import jwt from "jsonwebtoken"
import { action, computed, observable } from "mobx"
import { NextPageContext } from "next"
import cookies from "next-cookies"
import React from "react"

// Local
import { User } from "~/interfaces/user"
import { login } from "~/lib/login"
import { me } from "~/lib/me"

export class AuthStore {
  @observable loading = false
  @observable token = null
  @observable email = ""
  @observable password = ""
  @observable error = null
  @observable user: User = null
  @computed get isLoggedIn() {
    return this.token != null
  }

  hydrate(serializedStore) {
    this.token = serializedStore.token
    this.user = serializedStore.user
  }

  @action handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault()
    this.error = null
    this[event.target.name] = event.target.value
  }

  @action async login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const res = await login(this.email, this.password)
    const data = await res.json()
    if (data.token) {
      this.token = data.token
      Cookies.set("token", data.token)
      this.error = null
      this.email = ""
      this.password = ""
    } else this.error = data.message
  }

  @action async logout() {
    Cookies.remove("token")
    this.token = null
  }

  @action async fetchUser() {
    const res = await me(Cookies.get("token"))
    const data = await res.json()
    this.user = data
  }
}

export async function fetchInitialAuthStoreState({ ctx }: { ctx: NextPageContext }) {
  let { token } = cookies(ctx)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const decoded: any = jwt.decode(token ?? "", { complete: true })
  const expired = Date.now() >= decoded?.payload.exp * 1000 // Client-side expiration check
  if (expired) token = null

  // Redirect if not logged in
  if (!token && ctx.pathname !== "/editor/login" && ctx.pathname.includes("/editor")) {
    ctx.res.writeHead(302, { Location: "/editor/login" }).end()
  }

  // Return initial store state
  switch (ctx.pathname) {
    case "/editor": {
      const res = await me(token)
      const user = await res.json()
      return { token: token ?? null, user }
    }
    default: {
      return { token: token ?? null }
    }
  }
}
