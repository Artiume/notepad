// External
import { observer } from "mobx-react"
import moment from "moment"
import Link from "next/link"
import Router from "next/router"
import React from "react"
import styled from "styled-components"
import * as titlelize from "title"

// Local
import { Main } from "~/components"
import { useStores } from "~/store"

// Components
const Date = styled.span({
  display: "inline-block",
  width: 160,
  textAlign: "right",
  paddingRight: 10,
  color: "rgb(119, 119, 119)",
  "@media (max-width: 800px)": {
    display: "flex",
    marginBottom: "5px",
    fontSize: "13px",
  },
  "@media (prefers-color-scheme: dark)": {
    color: "rgba(150, 150, 150)",
  },
})

const Article = styled.div({
  margin: " 0 0 10px 0",
})

const ArticleLink = styled.a(({ theme }) => ({
  textDecoration: "none",
  color: theme.colors.primary,
  margin: "10px 15px",
  ":hover": {
    background: theme.colors.primary,
    color: "white",
    cursor: "pointer",
  },
  "@media (max-width: 800px)": {
    margin: 0,
  },
}))

const Index = () => {
  const { store, auth } = useStores()
  React.useEffect(() => {
    if (!auth.isLoggedIn) Router.push("/editor/login")
  }, [auth.isLoggedIn])

  const articles = store.articles.filter(article => article.author.id === auth.user.id)

  return (
    <Main title="Editor" editor={true}>
      <Article>
        <Date>+</Date>
        <Link href="/editor/new">
          <ArticleLink>Write Article</ArticleLink>
        </Link>
      </Article>
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
