import React from "react"
import styled from "styled-components"
import { Meta, Logo } from ".."

export const Wrapper = styled.div({
  padding: "25px 50px",
  "@media (max-width: 800px)": {
    padding: "25px",
  },
})

interface MainProps {
  title: string
  description?: string
  editor?: boolean
  author?: string
}

export const Main: React.FC<MainProps> = ({ children, title, description = "", author = "", editor = false }) => (
  <Wrapper>
    <Meta title={title} description={description} author={author} />
    <Logo editor={editor} />
    {children}
  </Wrapper>
)
