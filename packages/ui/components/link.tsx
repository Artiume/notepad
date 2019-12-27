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
