import React from "react"

declare module "react" {
  interface ImgHTMLAttributes<T> {
    async?: boolean
    loading?: string
    importance?: string
  }
}

export const Image = ({ width, src, alt }) => (
  <figure>
    <img async loading="lazy" decoding="async" importance="low" width={width} src={src} alt={alt} />
    {alt && (
      <figcaption>
        <em>{alt}</em>
      </figcaption>
    )}
    <style jsx>{`
      img {
        max-width: 100%;
        border-radius: 3px;
      }

      figure {
        margin: 60px 0 50px;
        display: inline-block;
        position: relative;
      }

      figure:before {
        content: " ";
        width: 1000%;
        height: calc(100% + 80px);
        display: block;
        position: absolute;
        left: -1000px;
        z-index: -1;
        margin-top: ${alt ? "-48px" : "-45px"};
        border-top: 1px solid #e1e1e1;
        border-bottom: 1px solid #e1e1e1;
        background: #f9f9f9;
      }

      @media (prefers-color-scheme: dark) {
        figure:before {
          border-top: 1px solid #333;
          border-bottom: 1px solid #333;
          background: #111;
        }
      }

      figcaption {
        text-align: center;
        font-weight: 400;
        font-size: 90%;
        margin-top: 10px;
        color: #999;
      }
    `}</style>
  </figure>
)
