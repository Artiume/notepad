import React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism"
import styled from "styled-components"

const Container = styled.div({
  margin: "50px 0",
})

export const CodeBlock = props => {
  return (
    <Container>
      <SyntaxHighlighter language={props.language} style={atomDark}>
        {props.value}
      </SyntaxHighlighter>
    </Container>
  )
}
