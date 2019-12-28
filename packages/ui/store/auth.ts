// External
import { action, computed, observable } from "mobx"
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
    this.loading = serializedStore.loading
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
      this.error = null
    } else this.error = data.message
  }
}
