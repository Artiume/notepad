import { observer } from "mobx-react"
import Router from "next/router"
import React from "react"
import { useStores } from "../../store"

const Index = () => {
  const { auth } = useStores()
  React.useEffect(() => {
    if (!auth.isLoggedIn) Router.push("/admin/login")
  }, [auth.isLoggedIn])

  return <div>admin</div>
}

export default observer(Index)
