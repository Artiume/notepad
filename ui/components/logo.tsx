/* eslint-disable */
import React from "react"
import Link from "next/link"
import { observer } from "mobx-react"
import { useStores } from "../store"

const Logo = () => {
  const { store } = useStores()

  return (
    <div>
      <Link href="/">
        <a>{store.hostname}</a>
      </Link>{" "}
      (<a href="https://github.com/notepad">src</a>)
      <style jsx>{`
        div {
          padding-bottom: 50px;
        }

        a {
          text-decoration: none;
          color: #0070f3;
        }

        a:hover {
          background: #0070f3;
          color: white;
        }
      `}</style>
    </div>
  )
}

export default observer(Logo)
