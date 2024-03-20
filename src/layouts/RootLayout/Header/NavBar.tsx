import styled from "@emotion/styled"
import Link from "next/link"

const NavBar: React.FC = () => {
  const links = [
    { id: 1, name: "About", to: "/about" },
    { id: 2, name: "Register", to: "/register" },
    { id: 3, name: "Receive CV", to: "/receive" },
    { id: 4, name: "Post", to: "/post" },
    { id: 5, name: "Login", to: "/login" },
    // { id: 5, name: "Submit", to: "/submit" },

  ]
  return (
    <StyledWrapper className="">
      <ul>
        {links.map((link) => (
          <li key={link.id}>
            <Link href={link.to}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </StyledWrapper>
  )
}

export default NavBar

const StyledWrapper = styled.div`
  flex-shrink: 0;
  ul {
    display: flex;
    flex-direction: row;
    li {
      display: block;
      margin-left: 1rem;
      color: ${({ theme }) => theme.colors.gray11};
    }
  }
`
