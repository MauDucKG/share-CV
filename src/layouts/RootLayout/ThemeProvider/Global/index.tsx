import { Global as _Global, css, useTheme } from "@emotion/react"

import { ThemeProvider as _ThemeProvider } from "@emotion/react"
import { pretendard } from "src/assets"

export const Global = () => {
  const theme = useTheme()

  return (
    <_Global
      styles={css`
        body {
          margin: 0;
          padding: 0;
          color: ${theme.colors.gray12};
          background-color: ${theme.colors.gray2};
          font-family: ${pretendard.style.fontFamily};
          font-weight: ${pretendard.style.fontWeight};
          font-style: ${pretendard.style.fontStyle};
        }

        * {
          color-scheme: ${theme.scheme};
          box-sizing: border-box;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          margin: 0;
          font-weight: inherit;
          font-style: inherit;
        }

        a {
          all: unset;
          cursor: pointer;
        }

        ul {
          padding: 0;
        }

        // init button
        button {
          all: unset;
          cursor: pointer;
        }

        // init input
        input {
          all: unset;
          box-sizing: border-box;
        }

        // init textarea
        textarea {
          border: none;
          background-color: transparent;
          font-family: inherit;
          padding: 0;
          outline: none;
          resize: none;
          color: inherit;
        }

        hr {
          width: 100%;
          border: none;
          margin: 0;
          border-top: 1px solid ${theme.colors.gray6};
        }

        .markdown h1,
        .markdown h2,
        .markdown h3,
        .markdown h4,
        .markdown h5,
        .markdown h6 {
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-size: 1.5rem;
          font-weight: bold;
        }

        .markdown a {
          color: #0366d6;
          text-decoration: none;
        }

        .markdown a:hover {
          text-decoration: underline;
        }

        .markdown pre {
          background-color: #f6f8fa;
          padding: 1rem;
          border-radius: 0.25rem;
          margin-top: 1rem;
          margin-bottom: 1rem;
          overflow: auto;
        }

        .markdown code {
          font-size: 0.9rem;
        }

        .markdown ul,
        .markdown ol {
          padding-left: 2rem;
          margin-top: 1rem;
          margin-bottom: 1rem;
        }

        .markdown blockquote {
          margin: 1rem 0;
          padding: 0.5rem 1rem;
          border-left: 0.25rem solid #dfe2e5;
          color: #6a737d;
          background-color: #f6f8fa;
        }

        .markdown p code {
          background-color: #f6f8fa;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.9rem;
        }
      `}
    />
  )
}
