// External
import { observer } from "mobx-react"
import Router from "next/router"
import React from "react"

// Local
import Meta from "~/components/meta"
import { useStores } from "~/store"

const Login = () => {
  const { auth } = useStores()
  React.useEffect(() => {
    if (auth.isLoggedIn) Router.push("/admin")
  }, [auth.isLoggedIn])

  return (
    <main>
      <Meta title="Login" />
      <form onSubmit={e => auth.login(e)}>
        <h2>Login</h2>

        <div>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="dante@issaias.net"
            value={auth.email}
            onChange={e => auth.handleChange(e)}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••••••"
            value={auth.password}
            onChange={e => auth.handleChange(e)}
          />
        </div>

        <input type="submit" value="Log in" />

        {auth.error && <span>{auth.error}</span>}
      </form>

      <style jsx>{`
        main {
          height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        form {
          width: 100%;
          max-width: 230px;
        }

        h2 {
          margin-bottom: 20px;
        }

        label {
          display: block;
          font-size: 14px;
          margin-bottom: 2px;
        }

        input {
          width: 100%;
          padding: 6px;
          border-radius: 3px;
          border: 1px solid #ddd;
          font-size: 14px;
          outline: none;
        }

        input:focus {
          border-color: black;
        }

        div {
          margin-bottom: 20px;
        }

        input[type="submit"] {
          border: 1px solid #0070f3;
          background: none;
          padding: 8px;
          cursor: pointer;
          color: #0070f3;
        }

        input[type="submit"]:hover {
          background: #0070f3;
          color: white;
        }

        span {
          display: block;
          margin-top: 20px;
          color: red;
          line-height: 22px;
        }
      `}</style>
    </main>
  )
}

export default observer(Login)
