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
        margin: 15px 0;
        display: inline-block;
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
