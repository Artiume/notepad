// External
import Cookies from "js-cookie"
import { action, computed, observable } from "mobx"
import { NextPageContext } from "next"
import cookies from "next-cookies"
import React from "react"

// Local
import { login } from "~/lib/login"

export class AuthStore {
  @observable loading = false
  @observable token = null
  @observable email = ""
  @observable password = ""
  @observable error = null
  @computed get isLoggedIn() {
    return this.token != null
  }

  hydrate(serializedStore) {
    this.token = serializedStore.token
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
    } else this.error = data.message
  }

  @action async logout() {
    Cookies.remove("token")
    this.token = null
  }
}

export async function fetchInitialAuthStoreState({ ctx }: { ctx: NextPageContext }) {
  const { token } = cookies(ctx)

  // // Redirect if not logged in
  // if (!token && ctx.pathname !== "/editor/login" && ctx.pathname.includes("editor")) {
  //   ctx.res.writeHead(302, { Location: "/editor/login" }).end()
  // }

  // Return initial store state
  switch (ctx.pathname) {
    default: {
      return { token: token ?? null }
    }
  }
}
