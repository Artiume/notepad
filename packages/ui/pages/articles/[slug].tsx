// External
import { observer } from "mobx-react"
import { useRouter } from "next/router"
import React from "react"
import { Remarkable } from "remarkable"
import styled from "styled-components"
import * as titleize from "title"

// Local
import { Main, Article, A, TimeAgo } from "~/components"
import { User } from "~/interfaces/user"
import { useStores } from "~/store"
import highlight from "~/utils/highlight"

// Components
const Byline = styled.span({
  marginBottom: 25,
  fontSize: 12.5,
  display: "flex",
  alignItems: "center",
  color: "rgb(119, 119, 119)",
  "@media (prefers-color-scheme: dark)": {
    color: "rgba(150, 150, 150)"
  }
})

const Title = styled.h1({
  font: `500 18px Helvetica Neue, Helvetica, Arial, "Lucida Grande", sans-serif`,
  marginTop: 0,
  marginBottom: 15,
})

const Avatar = styled.img({
  height: 20,
  width: 20,
  background: "#eee",
  border: "0.5px solid #ccc",
  borderRadius: "50%",
  marginRight: 10,
  "@media(prefers-color-scheme: dark)": {
    background: "#111",
    border: "0.5px solid #333"
  }
})

const Divider = styled.span({
  background: `rgba(0, 0, 0, 0) url("data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSIxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNLjUgMTUuNWw3LTE1IiBzdHJva2U9IiNDOEM4QzgiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIvPjwvc3ZnPg==") repeat scroll 0% 0%`,
  width: 8,
  height: 16,
  marginRight: 10,
  marginLeft: 10,
})

interface MetaProps {
  title: string
  author: User
  createdAt: string
}

const Meta: React.FC<MetaProps> = ({ title, author, createdAt }) => {
  return (
    <React.Fragment>
      <Title>
        <A href="#">{titleize(title)}</A>
      </Title>
      <Byline>
        <Avatar src={author.avatar} />
        {author.firstName} {author.lastName} <Divider />
        <TimeAgo date={createdAt} long={true} />
        <TimeAgo date={createdAt} />
      </Byline>
    </React.Fragment>
  )
}

// Page
const Slug: React.FC = () => {
  // "Hooks"
  const md = new Remarkable({ highlight })
  const { store } = useStores()
  const router = useRouter()

  // Article
  const article = store.articles.filter(article => article.slug === router.query.slug)[0]
  const { title, author, content, createdAt } = article

  // Processed article
  const rendered = { __html: md.render(content) }

  return (
    <Main title={article.title}>
      <Article>
        <Meta author={author} createdAt={createdAt} title={title} />
        <div className="content" dangerouslySetInnerHTML={rendered} />
      </Article>

      <style jsx global>{`
        h1 {
          font-size: 18px;
        }

        h2 {
          font-size: 16px;
        }

        .content > h1, h2 {
          display: block;
          margin-bottom: 15px;
          padding-top: 10px;
        }

        .content > h1:after, h2:after {
          content: " ";
          display: block;
          width: 50px;
          height: 1px;
          background: #ddd;
          margin-top: 15px;
        }

        @media (prefers-color-scheme: dark) {
          .content > h1:after, h2:after {
            background: #444;
          }
        }

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
