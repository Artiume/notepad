// External
import { observer } from "mobx-react"
import moment from "moment"
import Link from "next/link"
import React from "react"
import styled from "styled-components"
import * as titlelize from "title"

// Local
import { Main } from "~/components"
import { useStores } from "~/store"

// Components
const Date = styled.span({
  display: "inline-block",
  width: 150,
  textAlign: "right",
  paddingRight: 10,
  color: "rgb(119, 119, 119)",
  "@media (max-width: 800px)": {
    display: "flex",
    marginBottom: "5px",
    fontSize: "12px",
  },
  "@media (prefers-color-scheme: dark)": {
    color: "rgba(150, 150, 150)",
  },
})

const Article = styled.div({
  margin: "0 0 10px 0",
  "@media (max-width: 800px)": {
    margin: "0 0 20px 0",
  },
})

const ArticleLink = styled.a(({ theme }) => ({
  textDecoration: "none",
  color: theme.colors.primary,
  margin: "10px 15px 10px 10px",
  ":hover": {
    background: theme.colors.primary,
    color: "white",
    cursor: "pointer",
  },
  "@media (max-width: 800px)": {
    margin: 0,
  },
}))

// Page
const Index = () => {
  const { store } = useStores()
  const { articles } = store

  return (
    <Main title={store.hostname}>
      {articles
        .slice()
        .reverse()
        .map(article => {
          const { id, title, slug, createdAt } = article
          const linkAs = `/articles/${slug}`

          return (
            <Article key={id}>
              <Date>{moment(createdAt).format("MMMM DD, YYYY")}</Date>
              <Link href="/articles/[slug]" as={linkAs}>
                <ArticleLink>{titlelize(title)}</ArticleLink>
              </Link>
            </Article>
          )
        })}
    </Main>
  )
}

export default observer(Index)
