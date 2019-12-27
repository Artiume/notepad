import { Provider } from "mobx-react"
import App from "next/app"
import React from "react"
import { ThemeProvider } from "styled-components"
import { fetchInitialStoreState, Store } from "../store"
import { AuthStore } from "../store/auth"

const theme = {
  colors: {
    primary: "##070f3",
  },
}

class MyApp extends App {
  state = {
    store: new Store(),
    auth: new AuthStore(),
  }

  // Fetching serialized(JSON) store state
  static async getInitialProps(appContext) {
    const appProps = await App.getInitialProps(appContext)
    const initialStoreState = await fetchInitialStoreState(appContext)

    return {
      ...appProps,
      initialStoreState,
    }
  }

  static getDerivedStateFromProps(props, state) {
    state.store.hydrate(props.initialStoreState)
    state.auth.hydrate(props.initialStoreState)
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
