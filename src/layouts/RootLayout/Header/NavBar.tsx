import styled from "@emotion/styled"
import Link from "next/link"
import useDropdown from "src/hooks/useDropdown"
import { useState, useEffect } from "react"
import { LINK_TO_CLIENT, LINK_TO_SERVER, DATA_USER } from "src/constants"
import { loginGithub } from "src/apis"

const NavBar: React.FC = () => {
  var redirect_uri =
    "https://api.utteranc.es/authorize?redirect_uri=" +
    encodeURIComponent(LINK_TO_CLIENT)

  const links = [
    { id: 2, name: "📝 Register", to: "/register" },
    { id: 3, name: "✉️ Receive CV", to: "/receive" },
    { id: 4, name: "📰 New Feed", to: "/post" },
    { id: 5, name: "📣 Submit Post", to: "/submit" },
    { id: 9, name: "💬 Talk Space ", to: "/chat" },
    // { id: 10, name: "🖥 Admin", to: "/admin" },

  ]

  const logouts = [{ id: 2, name: "Logout", to: "/" }]
  const [dropdownRef, opened, handleOpen] = useDropdown()
  const [dropdownLogout, logout, handleLogout] = useDropdown()
  const [userdata, setUserData] = useState(DATA_USER)
  const [isLogin, setIsLogin] = useState(false)
  const [utterancesParam, setUtterancesParam] = useState("")
  const [moreText, setMoreText] = useState("More")

  const handleLogoutGithub = () => {
    setIsLogin(false)
    if (typeof localStorage !== "undefined") {
      localStorage.clear()
    }
    window.location.href = "/"
  }

  let utterancesParam1
  if (
    typeof localStorage !== "undefined" &&
    localStorage.getItem("utterances-session")
  ) {
    utterancesParam1 = localStorage.getItem("utterances-session")
  }
  const data = {
    data: utterancesParam1,
  }

  const login = async () => {
    try {
      await loginGithub(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const utterancesValue = urlParams.get("utterances")
    if (utterancesValue) {
      setUtterancesParam(utterancesValue)
      localStorage.setItem("utterances-session", utterancesValue)
    }
    if (
      typeof localStorage !== "undefined" &&
      localStorage.getItem("user_data")
    ) {
      const storedUserDataJSON = localStorage.getItem("user_data")
      if (storedUserDataJSON) {
        setUserData(JSON.parse(storedUserDataJSON))
      }
    }

    if (localStorage.getItem("utterances-session")) {
      setIsLogin(true)
      setMoreText(userdata.login)
    }
    if (
      typeof localStorage !== "undefined" &&
      !localStorage.getItem("user_data") &&
      localStorage.getItem("utterances-session")
    ) {
      login()
      setMoreText(userdata.login)
    }
    if (isLogin && userdata.login === "") {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 2000);

      return () => clearTimeout(timer);
    }

  }, [isLogin])

  useEffect(() => {
    if (isLogin && userdata.login !== "") {
      setIsLogin(false)
      window.location.href = "/"
    }
    
  }, [])
  if (isLogin && userdata.isRestricted && window.location.pathname !== "/banned") {
    window.location.href = "/banned";
  }

  if (isLogin && userdata.login === "") {
    return (
      <div className="loading">
        Loading...
      </div>
    );
  }

  return (
    <StyledWrapper>
      <div className="wrapper">
        {(!userdata.isRestricted) && <Link href={"/about"}>
          About
        </Link>
        } 
        <div ref={dropdownRef} onClick={handleOpen} className="more-button">
          {moreText}
        </div>
      </div>

      {opened && (
        <div>
          <div className="content">
          {links.map((link, i) => {
            if ((!isLogin || userdata.login === "") && (i === 1 || i === 2 || i == 4)) {
              return (
                <div className="item" key={i}>
                  <Link
                    className="item"
                    href={link.to}
                  >
                    {link.name}
                  </Link>
                </div>
              );
            }
            // else if (userdata.role === "candidate" && (i !== 3)) {
            //   return (
            //     <div className="item" key={i}>
            //       <Link
            //         className="item"
            //         href={link.to}
            //       >
            //         {link.name}
            //       </Link>
            //     </div>
            //   );
            // }
            // else if (userdata.role === "admin") {
            else if (isLogin && userdata.isRestricted) {
            }
            else {
              return (
                <div className="item" key={i}>
                  <Link
                    className="item"
                    href={link.to}
                  >
                    {link.name}
                  </Link>
                </div>
              );
            }
            return null; 
          })}
            {(isLogin && userdata.login !== "") || (
              <div className="item" key={6}>
                <a
                  className="btn btn-primary"
                  href={redirect_uri}
                  target="_top"
                >
                  Sign in with GitHub
                </a>
              </div>
            )}
            {isLogin && userdata.login !== "" ? (
              <>
                {(!userdata.isRestricted ) && <div className="item" key={7}>
                  <a
                    href={"/profile"}
                    className="btn btn-primary"
                  >
                    👤 My Profile
                  </a>
                </div>
                }
                {( userdata.role === "admin" ) && <div className="item" key={10}>
                  <a
                    className="item"
                    href={"https://app.appsmith.com/app/share-cv-dashboard/cvs-663bbc9a64694d0878426478"}
                  >
                    🏡 Dashboard {"   "}
                  </a>
                </div>
                }
                {( userdata.role === "admin" ) && <div className="item" key={11}>
                  <a
                    href={"/admin"}
                    className="btn btn-primary"
                  >
                    🖥 Admin
                  </a>
                </div>
                }
                <div className="item" key={8}>
                  <a
                    className="item"
                    onClick={() => handleLogoutGithub()}
                    href={"/"}
                  >
                    💤 Logout {"   "}
                  </a>
                </div>
                
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </StyledWrapper>
  )
}

export default NavBar

const StyledWrapper = styled.div`
  flex-direction: row;
  > .wrapper {
    display: flex;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    gap: 0.25rem;
    align-items: center;
    font-size: 1.25rem;
    line-height: 1.75rem;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.gray11};
  }
  .more-button {
    margin-left: 0.5rem;
  }
  .content {
    position: absolute;
    z-index: 40;
    padding: 0.25rem;
    border-radius: 0.75rem;
    background-color: ${({ theme }) => theme.colors.gray2};
    color: ${({ theme }) => theme.colors.gray10};
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);

    > .item {
      padding: 0.25rem;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      border-radius: 0.75rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      white-space: nowrap;
      cursor: pointer;

      :hover {
        background-color: ${({ theme }) => theme.colors.gray4};
      }
    }
    .icon {
      font-size: 1.5rem;
      line-height: 2rem;
    }
  }
`
