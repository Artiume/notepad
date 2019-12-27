import { observer } from "mobx-react"
import moment from "moment"
import Link from "next/link"
import React from "react"
import title from "title"
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
              <a>{title(article.title)}</a>
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

        a {
          text-decoration: none;
          color: #0070f3;
        }

        a:hover {
          background: #0070f3;
          color: white;
        }
      `}</style>
    </main>
  )
}

export default observer(Index)
