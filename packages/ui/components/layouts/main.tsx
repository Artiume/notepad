import React from "react"
import styled from "styled-components"
import { Meta, Logo } from ".."

export const Wrapper = styled.div({
  padding: "25px 50px",
  "@media (max-width: 800px)": {
    padding: "25px",
  },
})

export const Main: React.FC<{ title: string }> = ({ children, title }) => (
  <Wrapper>
    <Meta title={title} />
    <Logo />
    {children}
  </Wrapper>
)
