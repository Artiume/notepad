/* eslint-disable */
import React from "react"
import Head from "next/head"
import NProgress from "nprogress"
import Router from "next/router"
import { Styles } from "../utils/github"

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

export default ({ title }) => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>
    </Head>

    {/* global styles */}
    <style jsx global>{`
      * {
        margin: 0;
        box-sizing: border-box;
      }

      body {
        font: 14px SF Mono Powerline, SF Mono, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
          Bitstream Vera Sans Mono, Courier New, monospace, serif;
      }

      @media (prefers-color-scheme: dark) {
        body {
          background: black;
          color: white;
        }
      }

      /* loading progress bar styles */
      #nprogress {
        pointer-events: none;
      }

      #nprogress .bar {
        background: #0070f3;
        position: fixed;
        z-index: 1031;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
      }

      #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 10px #0070f3, 0 0 5px #0070f3;
        opacity: 1;
        transform: rotate(3deg) translate(0px, -4px);
      }
    `}</style>

    <Styles />
  </div>
)
