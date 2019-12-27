// External
import { observer } from "mobx-react"
import moment from "moment"
import { useRouter } from "next/router"
import React from "react"
import { Remarkable } from "remarkable"
import styled from "styled-components"
import * as titleize from "title"

// Local
import { Logo, Meta, Main, Article, A } from "../../components"
import { useStores } from "../../store"
import highlight from "../../utils/highlight"

// Components
const Date = styled.span({
  marginBottom: 20,
  display: "block",
  color: "rgb(119, 119, 119)",
})

const Title = styled.h1({
  font: `500 18px Helvetica Neue, Helvetica, Arial, "Lucida Grande", sans-serif`,
  marginTop: 0,
  marginBottom: 10,
})

// Page
const Slug = () => {
  // "Hooks"
  const md = new Remarkable({ highlight })
  const { store } = useStores()
  const router = useRouter()

  // Article
  const article = store.articles.filter(article => article.slug === router.query.slug)[0]
  const { title, content, createdAt } = article

  // Processed article
  const rendered = { __html: md.render(content) }
  const timeFormatted = moment(createdAt).format("MMMM DD, YYYY")
  const timeFromNow = moment(createdAt).fromNow()

  return (
    <Main>
      <Meta title={article.title} />
      <Logo />

      <Article>
        <Title>
          <A href="#">{titleize(title)}</A>
        </Title>

        <Date>
          {timeFormatted} ({timeFromNow})
        </Date>
        <div dangerouslySetInnerHTML={rendered} />
      </Article>

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
    </Main>
  )
}

export default observer(Slug)
