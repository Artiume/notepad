// External
import { observer } from "mobx-react"
import Link from "next/link"
import React from "react"
import styled from "styled-components"

// Local
import { useStores } from "../store"
import { A, AButton } from "./link"

const LogoWrapper = styled.div({
  paddingBottom: 50,
})

const Logo = ({ editor = false }) => {
  const { store, auth } = useStores()

  return (
    <LogoWrapper>
      <Link href={editor ? "/editor" : ""}>
        <A>
          {store.hostname}
          {editor ? "/editor" : ""}
        </A>
      </Link>{" "}
      ({editor ? <AButton onClick={() => auth.logout()}>logout</AButton> : <A href="https://github.com/notepad">src</A>}
      )
    </LogoWrapper>
  )
}

export default observer(Logo)
