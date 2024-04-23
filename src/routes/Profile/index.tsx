import React, { useEffect, useState } from "react"
import styled from "@emotion/styled"
import { Emoji } from "src/components/Emoji"
import local from "next/font/local"
import axios from "axios"
import { LINK_TO_SERVER } from "src/constants"
import Image from "next/image"
const Profile: React.FC = () => {
  const [userdata, setUserData] = useState({
      "login": "",
      "id": 0,
      "node_id": "",
      "avatar_url": "",
      "gravatar_id": "",
      "url": "",
      "html_url": "",
      "type": "User",
      "site_admin": false,
      "name": "",
      "company": null,
      "blog": "",
      "location": null,
      "email": null,
      "hireable": null,
      "bio": null,
      "twitter_username": null,
      "public_repos": 0,
      "public_gists": 0,
      "followers": 0,
      "following": 0,
      "created_at": "2022-02-20T11:55:01Z",
      "updated_at": "2024-04-23T01:20:02Z"
  })

  let utterancesParam
  if (typeof localStorage !== "undefined" && localStorage.getItem("utterances-session")) {
    utterancesParam = localStorage.getItem("utterances-session")
  }
  const data = {
    "data": utterancesParam
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
        console.log(userdata)
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, [userdata.login]);  
  

  return (
    <StyledWrapper>
      <div className="wrapper">
        <div className="top">
          <Emoji>📝</Emoji>
        </div>
        <div className="text">Profile</div>
        <div className="form">
          <div className="text"> {userdata.login}</div>
          <Image
                src={userdata.avatar_url}
                alt={userdata.login}
                width={400} 
                height={400} 
              />
          <div className="text">Name: {userdata.name}</div>
          <div className="text">Followers: {userdata.followers}</div>
          <div className="text">Following: {userdata.following}</div>
          <div className="text">Public Repos: {userdata.public_repos}</div>

        </div>
      </div>
    </StyledWrapper>
  )
}

export default Profile

const StyledWrapper = styled.div`
  margin: 0 auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 3rem;
  padding-bottom: 3rem;
  border-radius: 1.5rem;
  max-width: 56rem;
  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    align-items: center;
    .top {
      display: flex;
      align-items: center;
      font-size: 3.75rem;
      line-height: 1;
      > div {
        margin: 0.5rem;
      }
    }
    .text {
      font-size: 1.875rem;
      line-height: 2.25rem;
      color: ${({ theme }) => theme.colors.gray11};
    }
    .form {
      width: 90%; 
      color: ${({ theme }) => theme.colors.gray11};

      @media (min-width: 768px) { 
        width: 70%;
    }
    .form-submit {
      text-align: center;
    }
    .btn-submit {
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      padding-left: 1.25rem;
      padding-right: 1.25rem;
      border-radius: 1rem;
      background-color: ${({ theme }) => theme.colors.blue4};
      font-size: 1rem; /* adjust this value to your preference */
    }
    .btn-submit1 {
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      padding-left: 1.25rem;
      padding-right: 1.25rem;
      border-radius: 1rem;
      background-color: ${({ theme }) => theme.colors.green4};
      font-size: 1rem; /* adjust this value to your preference */
    }
  }
`
