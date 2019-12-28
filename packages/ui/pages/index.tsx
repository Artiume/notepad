// External
import { observer } from "mobx-react"
import moment from "moment"
import Link from "next/link"
import React from "react"
import styled from "styled-components"
import * as titlelize from "title"

// Local
import { A, Main, Logo, Meta } from "~/components"
import { useStores } from "~/store"

// Components
const Date = styled.span({
  display: "inline-block",
  width: "140px",
  textAlign: "right",
  marginRight: 30,
  color: "rgba(153, 153, 153)",
})

const Article = styled.div({
  margin: " 0 0 10px 0",
})

// Page
const Index = () => {
  const { store } = useStores()
  const { articles } = store

  return (
    <Main>
      <Meta title={store.hostname} />
      <Logo />

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
                <A>{titlelize(title)}</A>
              </Link>
            </Article>
          )
        })}
    </Main>
  )
}

export default observer(Index)
