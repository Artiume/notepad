import { observer } from "mobx-react"
import moment from "moment"
import Link from "next/link"
import React from "react"
import title from "title"
import { A } from "../components/link"
import Logo from "../components/logo"
import Meta from "../components/meta"
import { useStores } from "../store"

const Index = () => {
  const { store } = useStores()

  return (
    <main>
      <Meta />
      <Logo />
      {store.articles
        .slice()
        .reverse()
        .map(article => (
          <div key={article.id}>
            <span>{moment(article.createdAt).format("MMMM DD, YYYY")}</span>
            <Link href="/articles/[slug]" as={`/articles/${article.slug}`}>
              <A>{title(article.title)}</A>
            </Link>
          </div>
        ))}

      <style jsx>{`
        main {
          padding: 25px 50px;
        }

        @media (max-width: 800px) {
          main {
            padding: 25px;
          }
        }

        div {
          margin: 0 0 10px 0;
        }

        h1 {
          font-size: 25px;
          margin-top: 0;
          margin-bottom: 30px;
        }

        span {
          display: inline-block;
          width: 140px;
          text-align: right;
          margin-right: 30px;
          color: rgb(153, 153, 153);
        }
      `}</style>
    </main>
  )
}

export default observer(Index)
