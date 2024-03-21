import styled from "@emotion/styled";
import React, { useState } from "react";
import { Emoji } from "src/components/Emoji";
import { useEffect } from "react";
import { render } from "react-dom";

type Props = {};

const CLIENT_ID = "3a0867acc92f99838faf"

const Login: React.FC<Props> = () => {
  
  const [rerender, setRerender] = useState(false)
  useEffect(() => {
    if (typeof window !== 'undefined') {
        console.log('we are running on the client')
    } else {
        console.log('we are running on the server');
    }
    const queryString = window.location.search;
    const urlParam = new URLSearchParams(queryString)
    const codeParam = urlParam.get('code')
    console.log(codeParam)

    if (codeParam && (localStorage.getItem("accessToken") === null)){
      async function getAccessToken() {
        await fetch("https://localhost:4000/getAccessToken?code="+codeParam, {
          method: "GET"
        }).then((response) => {
          return response.json();
        }).then((data) => {
          console.log(data)
          if (data.access_token){
            localStorage.set("accessToken", data.access_token)
            setRerender(!rerender)
          }
        })
      }
      getAccessToken()
    }
  }, [])

  async function getUserData() {
    await fetch("https://localhost:4000/getUserData", {
      method: "GET",
      headers: {
        "Authorization" : "Bearer" + localStorage.getItem("accessToken")
      }
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data)
    })
  }

  const handlelogin = async () => {
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID)
  }

  return (
    <StyledWrapper>
      <div className="wrapper">
        {/* <div className="top">
          <div>4</div>
          <Emoji>🤔</Emoji>
          <div>4</div>
        </div>
        <div className="text">Post not found</div> */}
        {localStorage.getItem("accessToken") ?
        <>
          <h1>We have access token</h1>
          <button onClick={() => {localStorage.removeItem("accessToken"); setRerender(!render);}}>
            Log out</button>
          <h3>Get Data User</h3>
          <button onClick={getUserData}>Get Data</button>

        </>  
        :
        <>
          <div className="text">User is not logged in</div>
          <button onClick={handlelogin}>Sign in with GitHub</button>
        </>
      }
        
      </div>
    </StyledWrapper>
  );
};

export default Login;

const StyledWrapper = styled.div`
  margin: 0 auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 3rem;
  padding-bottom: 3rem;
  border-radius: 1.5rem;
  max-width: 56rem;
  background-color: #f5f5f5;

  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    align-items: center;
    background-color: #ffffff;
    padding: 2rem;
    border-radius: 0.75rem;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);

    > .top {
      display: flex;
      align-items: center;
      font-size: 3.75rem;
      line-height: 1;
    }

    > .text {
      font-size: 1.875rem;
      line-height: 2.25rem;
      color: ${({ theme }) => theme.colors.gray11};
    }

    > button {
      padding: 1rem 2rem;
      font-size: 1.25rem;
      background-color: #24292e;
      color: #ffffff;
      border: none;
      border-radius: 0.25rem;
      cursor: pointer;
    }
  }
`;