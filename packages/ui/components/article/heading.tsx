import React from "react"
import slug from "slug"
import styled from "styled-components"

export const H = level =>
  styled[`h${level}`]<{ level: number }>(({ level }) => ({
    display: "block",
    fontWeight: 500,
    ...(level === 1 && { fontSize: 22 }),
    ...(level === 2 && { fontSize: 20 }),
    ...(level === 3 && { fontSize: 18 }),
    ...(level === 4 && { fontSize: 16 }),
    ...(level === 5 && { fontSize: 14 }),
    ...(level === 6 && { fontsize: 12 }),
  }))

export const Heading = ({ level, children }) => {
  const text = children[0].props.value.toLowerCase()
  const id = slug(text)
  const Element = H(level)

  return (
    <div>
      <Element level={level}>
        <span>
          <a href={`#${id}`} id={id}>
            #
          </a>
        </span>
        {children}
      </Element>

      <style jsx>{`
        div {
          margin: 50px 0 25px;
        }

        span {
          position: absolute;
          margin-left: -20px;
          width: 20px;
        }

        a {
          visibility: hidden;
          text-decoration: none;
          color: #0070f3;
        }

        a:hover {
          background: #0070f3;
          color: white;
          cursor: pointer;
        }

        div:hover a,
        span:hover a {
          visibility: visible;
        }
      `}</style>
    </div>
  )
}
