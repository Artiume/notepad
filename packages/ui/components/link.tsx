import styled from "styled-components"

export const A = styled.a(({ theme }) => ({
  textDecoration: "none",
  color: theme.colors.primary,
  ":hover": {
    background: theme.colors.primary,
    color: "white",
    cursor: "pointer",
  },
}))

export const AButton = styled.button(({ theme }) => ({
  textDecoration: "none",
  color: theme.colors.primary,
  background: "none",
  display: "inline",
  border: "none",
  font: "inherit",
  padding: 0,
  ":hover": {
    background: theme.colors.primary,
    color: "white",
    cursor: "pointer",
  },
}))
