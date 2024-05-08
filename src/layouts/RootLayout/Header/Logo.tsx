import Link from "next/link"
import { CONFIG } from "site.config"
import styled from "@emotion/styled"

const Logo = () => {
  const handleReload = () => {
    window.location.href = `/`
  }

  return (
    <StyledWrapper style={{ fontFamily: "Inter" }} onClick = {() => handleReload()} href="/" aria-label={CONFIG.blog.title}>
      {CONFIG.blog.title}
    </StyledWrapper>
  )
}

export default Logo

const StyledWrapper = styled(Link)``
