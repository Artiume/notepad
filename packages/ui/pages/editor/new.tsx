// External
import React from "react"
import styled from "styled-components"

// Local
import { Main } from "~/components"

// Components
const Editor = styled.div({
  maxWidth: 500,
  margin: "0 auto",
})

const Input = styled.input({
  display: "block",
  border: "1px solid #ddd",
  width: "100%",
  margin: 10,
  padding: 8,
  fontFamily: "sans-serif",
  ":focus": { borderColor: "#000" },
  "@media (prefers-color-scheme: dark)": {
    background: "#222",
    color: "white",
    border: "1px solid #555",
    borderRadius: 3,
    ":focus": { borderColor: "#aaa" },
  },
})

const Button = styled.button({
  margin: "10px -10px 10px 0",
  border: "1px solid #0070f3",
  background: "none",
  padding: 8,
  cursor: "pointer",
  color: "#0070f3",
  borderRadius: 3,
  ":hover": {
    background: "#0070f3",
    color: "white",
  },
})

const Textarea = styled.textarea({
  display: "block",
  border: "1px solid #ddd",
  width: "100%",
  margin: 10,
  padding: 8,
  resize: "none",
  height: "400px",
  fontSize: 15,
  fontFamily: "monospace",
  ":focus": { borderColor: "#000" },
  "@media (prefers-color-scheme: dark)": {
    background: "#222",
    color: "white",
    border: "1px solid #555",
    borderRadius: 3,
    ":focus": {
      borderColor: "#aaa",
    },
  },
})

const New = () => (
  <Main title="New Article" editor={true}>
    <Editor>
      <div style={{ display: "flex" }}>
        <Input placeholder="My Title" />
        <Button>Save</Button>
      </div>
      <Textarea placeholder="Lorem ipsum dolor sit" />
    </Editor>
  </Main>
)

export default New
