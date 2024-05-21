import React, { ReactNode } from "react"
import { ThemeProvider } from "./ThemeProvider"
import useScheme from "src/hooks/useScheme"
import Header from "./Header"
import styled from "@emotion/styled"
import Scripts from "src/layouts/RootLayout/Scripts"
import useGtagEffect from "./useGtagEffect"
import { Analytics } from "@vercel/analytics/react"
import { useRouter } from "next/router"
type Props = {
  children: ReactNode
}

const RootLayout = ({ children }: Props) => {
  const [scheme] = useScheme()
  useGtagEffect()
  const router = useRouter()

  return (
    <ThemeProvider scheme={scheme}>
      <Scripts />
      {/* // TODO: replace react query */}
      {/* {metaConfig.type !== "Paper" && <Header />} */}
      <Header fullWidth={false} />
      { router.route !== "/admin" ? 
      <StyledMain>
        {children}
        <Analytics />
      </StyledMain> 
      : 
      <StyledAdmin>
        {children}
        <Analytics />
      </StyledAdmin>
      } 
    </ThemeProvider>
  )
}

export default RootLayout

const StyledAdmin = styled.main`
  margin: 0 auto;
  width: 100%;
  padding: 0 1rem;
`

const StyledMain = styled.main`
  margin: 0 auto;
  width: 100%;
  max-width: 1120px;
  padding: 0 1rem;
`


