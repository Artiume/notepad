// External
import { Provider } from "mobx-react"
import App from "next/app"
import React from "react"
import { ThemeProvider } from "styled-components"

// Local
import { fetchInitialStoreState, Store } from "~/store"
import { fetchInitialAuthStoreState, AuthStore } from "~/store/auth"
import { theme } from "~/utils/theme"

class MyApp extends App {
  state = {
    store: new Store(),
    auth: new AuthStore(),
  }

  // Fetching serialized(JSON) store state
  static async getInitialProps(appContext) {
    const appProps = await App.getInitialProps(appContext)

    // Fetch initial store states
    const initialStoreState = await fetchInitialStoreState(appContext)
    const initialAuthStoreState = await fetchInitialAuthStoreState(appContext)

    return {
      ...appProps,
      initialStoreState,
      initialAuthStoreState,
    }
  }

  static getDerivedStateFromProps(props, state) {
    // Hydrate stores
    state.store.hydrate(props.initialStoreState)
    state.auth.hydrate(props.initialAuthStoreState)

    return state
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Provider store={this.state.store} auth={this.state.auth}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    )
  }
}
export default MyApp
