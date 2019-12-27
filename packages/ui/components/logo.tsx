/* eslint-disable */
import React from "react"
import Link from "next/link"
import { observer } from "mobx-react"
import styled from "styled-components"
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
