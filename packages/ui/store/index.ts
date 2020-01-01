// External
import { observable } from "mobx"
import { useStaticRendering, MobXProviderContext } from "mobx-react"
import { NextPageContext } from "next"
import React from "react"

// Local
import { Article } from "~/interfaces/article"
import { article } from "~/lib/article"
import { articles } from "~/lib/articles"
import { AuthStore } from "~/store/auth"

const isServer = typeof window === "undefined"
useStaticRendering(isServer)

// Main Store
export class Store {
  @observable hostname = ""
  @observable articles: Article[] = []

  hydrate(serializedStore) {
    this.articles = serializedStore.articles
    this.hostname = serializedStore.hostname
  }
}

// useStores() hook
export function useStores(): { store: Store; auth: AuthStore } {
  return React.useContext(MobXProviderContext)
}

// Fetch initial store state
// The output of this function is passed to hydrate().
// This function is run on both the client and the server depending
// on the situation. For new routes that need specific data create a new
// case in the switch statement. If they only need the hostname then the
// default case will suffice.
export async function fetchInitialStoreState({ ctx }: { ctx: NextPageContext }) {
  const hostname = isServer ? ctx.req.headers.host : window.location.host

  switch (ctx.pathname) {
    case "/": {
      const res = await articles()
      const data = await res.json()
      return { articles: data, hostname }
    }
    case "/articles/[slug]": {
      const res = await article((ctx.query.slug as string) ?? "")
      const data = await res.json()
      return { articles: [data], hostname }
    }
    case "/editor": {
      const res = await articles()
      const data = await res.json()
      return { articles: data, hostname }
    }
    default: {
      return { articles: [], hostname }
    }
  }
}
