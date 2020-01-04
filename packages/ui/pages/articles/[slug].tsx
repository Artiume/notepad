// External
import description from "description"
import { observer } from "mobx-react"
import { useRouter } from "next/router"
import React from "react"
import ReactMarkdown from "react-markdown"
import styled from "styled-components"
import * as titleize from "title"

// Local
import { Main, Article, A, TimeAgo } from "~/components"
import { Heading, Paragraph, Image } from "~/components/article"
import { User } from "~/interfaces/user"
import { useStores } from "~/store"

// Components
const Byline = styled.span({
  marginBottom: 25,
  fontSize: 14,
  display: "flex",
  alignItems: "center",
  color: "rgb(119, 119, 119)",
  "@media (prefers-color-scheme: dark)": {
    color: "rgba(150, 150, 150)",
  },
})

const Title = styled.h1({
  font: `500 22px Helvetica Neue, Helvetica, Arial, "Lucida Grande", sans-serif`,
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
    border: "0.5px solid #333",
  },
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
  const { store } = useStores()
  const router = useRouter()

  // Article
  const article = store.articles.filter(article => article.slug === router.query.slug)[0]
  const { title, author, content, createdAt } = article
  const desc = description({ content, limit: 160, endWith: ["..."] })

  return (
    <Main title={article.title} description={desc} author={`${author.firstName} ${author.lastName}`}>
      <Article>
        <Meta author={author} createdAt={createdAt} title={title} />
        <ReactMarkdown
          className="content"
          source={content}
          renderers={{ heading: Heading, paragraph: Paragraph, image: Image }}
        />
      </Article>
      <style jsx global>{`
        .content {
          font: 18px Helvetica Neue, Helvetica, Arial, "Lucida Grande", sans-serif;
        }
      `}</style>
    </Main>
  )
}

export default observer(Slug)
