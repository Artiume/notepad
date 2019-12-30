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

export class Store {
  @observable hostname = ""
  @observable articles: Article[] = []

  hydrate(serializedStore) {
    this.articles = serializedStore.articles
    this.hostname = serializedStore.hostname
  }
}

export function useStores(): { store: Store; auth: AuthStore } {
  return React.useContext(MobXProviderContext)
}

export async function fetchInitialStoreState({ ctx }: { ctx: NextPageContext }) {
  switch (ctx.pathname) {
    case "/": {
      const res = await articles()
      const data = await res.json()
      return { articles: data, hostname: isServer ? ctx.req.headers.host : window.location.host }
    }
    case "/articles/[slug]": {
      const res = await article((ctx.query.slug as string) ?? "")
      const data = await res.json()
      return { articles: [data], hostname: isServer ? ctx.req.headers.host : window.location.host }
    }
    default: {
      return { articles: [], hostname: "" }
    }
  }
}
