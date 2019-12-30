// External
import { observer } from "mobx-react"
import Link from "next/link"
import React from "react"
import styled from "styled-components"

// Local
import { useStores } from "../store"
import { A } from "./link"

const LogoWrapper = styled.div({
  paddingBottom: 50,
})

const Logo = () => {
  const { store } = useStores()

  return (
    <LogoWrapper>
      <Link href="/">
        <A>{store.hostname}</A>
      </Link>{" "}
      (<A href="https://github.com/notepad">src</A>)
    </LogoWrapper>
  )
}

export default observer(Logo)
