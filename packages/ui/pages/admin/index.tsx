// External
import { observer } from "mobx-react"
import Router from "next/router"
import React from "react"

// Local
import { Meta } from "~/components"
import { useStores } from "~/store"

const Index = () => {
  const { auth } = useStores()
  React.useEffect(() => {
    if (!auth.isLoggedIn) Router.push("/admin/login")
  }, [auth.isLoggedIn])

  return (
    <div>
      <Meta title="Editor" />
      <h3>Editor</h3>
      <button onClick={() => auth.logout()}>Log out</button>
    </div>
  )
}

export default observer(Index)
