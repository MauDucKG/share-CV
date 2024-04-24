import styled from "@emotion/styled"
import Link from "next/link"
import useDropdown from "src/hooks/useDropdown"
import { useState, useEffect } from "react"
import { LINK_TO_CLIENT, LINK_TO_SERVER, DATA_USER } from "src/constants"
import axios from "axios"

const NavBar: React.FC = () => {
  var redirect_uri = "https://api.utteranc.es/authorize?redirect_uri=" + encodeURIComponent(LINK_TO_CLIENT);

  const links = [
    { id: 2, name: "📝 Register", to: "/register" },
    { id: 3, name: "✉️ Receive CV", to: "/receive" },
    { id: 4, name: "📰 New Feed", to: "/post" },
    { id: 5, name: "📣 Submit Post", to: "/submit" },
    // { id: 6, name: "🕵️‍♂️ Profile", to: "/profile" },
  ]

  const logouts = [
    { id: 2, name: "Logout", to: "/" },
  ]
  const [dropdownRef, opened, handleOpen] = useDropdown()
  const [dropdownLogout, logout, handleLogout] = useDropdown()
  const [userdata, setUserData] = useState(DATA_USER)
  const [isLogin, setIsLogin] = useState(false)
  const [utterancesParam, setUtterancesParam] = useState("");

  const handleReload = (e : any) => {
    if (e === "/post" || e === "/about" || e === "/profile" || e === "/") {
      window.location.href = `${e}`;
    }
  }

  const handleLogoutGithub = () => {
    setIsLogin(!isLogin)
    if (typeof localStorage !== "undefined" && localStorage.getItem("utterances-session")) {
      localStorage.setItem("utterances-session", "")
    }
    window.location.href = "https://github.com/logout";
  }
  
  let utterancesParam1
  if (typeof localStorage !== "undefined" && localStorage.getItem("utterances-session")) {
    utterancesParam1 = localStorage.getItem("utterances-session")
  }
  const data = {
    "data": utterancesParam1
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const access_token = await axios.post(`${LINK_TO_SERVER}/getToken`, data);
        const infoResponse = await axios.get(`${LINK_TO_SERVER}/getUserData`, {
          headers: {
            Authorization: `Bearer ${access_token.data}`,
          },
        });

        setUserData(infoResponse.data)
      } catch (error) {
        console.log(error);
      }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const utterancesValue = urlParams.get("utterances");
    if (utterancesValue) {
      setUtterancesParam(utterancesValue);
      localStorage.setItem("utterances-session", utterancesValue);
      setIsLogin(true)
    }

    if (localStorage.getItem("utterances-session")) {
      setIsLogin(true)
    }
    fetchData();
  }, [userdata.login])

  useEffect(() => {
    if (isLogin) {
      handleReload("/");
    }
  }, [isLogin]);

  return (
    <StyledWrapper>
      <div className="wrapper">
        <Link onClick={() => handleReload("/about")} href={"/about"}>About</Link>
        <div ref={dropdownRef} onClick={handleOpen} className="more-button">
          More
        </div>
        {isLogin && userdata.login !== ""
        ? 
        <div>
          <Link onClick={() => handleReload("/profile")} href={"/profile"} className="more-button"> Profile</Link>
        </div>
        : <></>
        }
        {isLogin && userdata.login !== ""
        ? 
        <div className="more-button" ref={dropdownLogout} onClick={handleLogout} >
          Hello {userdata.login}
        </div>
        : <></>
        }
      </div>

      {opened && (
        <div className="content">
          {links.map((link, i) => (
            <div className="item" key={i}>
              <Link className="item" onClick={() => handleReload(link.to)} href={link.to}>
                {link.name}
              </Link>
            </div>
          ))}
          {isLogin && userdata.login !== "" || (
            <div className="item" key={6} >
              <a
                className="btn btn-primary"
                href={redirect_uri}
                target="_top"
                onClick={() => handleReload("/")}
              >
                Sign in with GitHub
              </a>
            </div>
          )}
        </div>
      )}

      {logout && (
        <div className="content">
          {logouts.map((link, i) => (
            <div className="item" key={i}>
              <Link className="item" onClick={() => handleLogoutGithub()} href={link.to}>
                {link.name}
              </Link>
            </div>
          ))}
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
  > .content {
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
`
