import React from "react"
import { observer } from "mobx-react"
import moment from "moment"
import title from "title"
import { useRouter } from "next/router"
import { Remarkable } from "remarkable"
import hljs from "highlight.js"
import "highlight.js/styles/github.css"
import Meta from "../../components/meta"
import Logo from "../../components/logo"
import { useStores } from "../../store"

const Slug = () => {
  const md = new Remarkable({
    highlight: function(str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value
        } catch (err) {
          console.log("Could not highlight.")
        }
      }

      try {
        return hljs.highlightAuto(str).value
      } catch (err) {
        console.log("Could not auto highlight.")
      }

      return "" // use external default escaping
    },
  })
  const { store } = useStores()
  const router = useRouter()
  const article = store.articles.filter(article => article.slug === router.query.slug)[0]

  return (
    <main>
      <Meta />
      <Logo />

      <article>
        {/*prettier-ignore*/}
        <h1><a href="#">{title(article.title)}</a></h1>
        <span>{moment(article.createdAt).format("MMMM DD, YYYY")}</span>
        <div dangerouslySetInnerHTML={{ __html: md.render(article.content) }} />
      </article>

      <style jsx global>{`
        p {
          font-size: 14px;
          line-height: 24px;
          margin-bottom: 20px;
        }

        pre {
          line-height: 20px;
          margin-bottom: 20px;
          font-size: 12px;
        }
      `}</style>

      <style jsx>{`
        main {
          padding: 25px 50px;
        }

        @media (max-width: 800px) {
          main {
            padding: 25px;
          }
        }

        article {
          max-width: 650px;
          margin: auto;
          font-size: 14px;
        }

        h1 {
          font: 500 18px Helvetica Neue, Helvetica, Arial, "Lucida Grande", sans-serif;
          margin-top: 0;
          margin-bottom: 10px;
        }

        span {
          margin-bottom: 20px;
          display: block;
          color: rgb(119, 119, 119);
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

export default observer(Slug)
