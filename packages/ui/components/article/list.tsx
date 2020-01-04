import React from "react"
import styled from "styled-components"

const Ordered = styled.ol({
  padding: 0,
  margin: "0 0 20px 0",
  listStyle: "inside decimal",
  "& li": {
    marginBottom: 5,
    lineHeight: 1.5,
  },
})

const Unordered = styled.ul({
  padding: 0,
  margin: "0 0 20px 0",
  listStyleType: "none",
  "& li": {
    marginBottom: 15,
    paddingLeft: 20,
    lineHeight: 1.5,
    ":before": {
      content: `"-"`,
      color: "#ababab",
      position: "absolute",
      marginLeft: -20,
      "@media (prefers-color-scheme: dark)": {
        color: "#3f3f3f",
      },
    },
  },
})

export const List = ({ ordered, ...props }) => (ordered ? <Ordered {...props} /> : <Unordered {...props} />)
