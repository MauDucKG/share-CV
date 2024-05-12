import { CONFIG } from "site.config"
import Image from "next/image"
import React, {useEffect, useState} from "react"
import styled from "@emotion/styled"
import { Emoji } from "src/components/Emoji"
import { DATA_USER } from "src/constants"

type Props = {
  userdata: typeof DATA_USER;


}



const ProfilePage: React.FC<Props> = ({ userdata }) => {
  const [isEdit, setisEdit] = useState(false)
  const handleEditProfile = () => {
    setisEdit(true)
  };

  const handleSave = () => {
    setisEdit(false)
  };

  return (
    
    <StyledWrapper>
      {!isEdit 
      ? <StyledWrapper>
        <div className="title">
          <Emoji>💻</Emoji> Profile
        </div>
        <div className="content">
          {userdata.avatar ?
          <div className="top">
            <Image src={userdata.avatar} fill alt="" />
          </div>
          : 
          <></>
          }
          <div className="mid">
            <div className=" name">{userdata.name ? userdata.name : userdata.login}</div>
            <div className="role">{userdata.role}</div>
            {
              !userdata.bio ?
              <div className="text-sm mb-2">{DATA_USER.bio}</div>
              :
              <></>
            }
            
          </div>

        </div>
        <button className="edit-profile-button" onClick={handleEditProfile}>Edit Profile</button>
      </StyledWrapper>
      : <StyledWrapper>
      <div className="title">
        <Emoji>💻</Emoji> Profile
      </div>
      <div className="content">
        {userdata.avatar ?
        <div className="top">
          <Image src={userdata.avatar} fill alt="" />
        </div>
        : 
        <></>
        }
        <div className="mid">
          <div className=" name"><input  type="text" placeholder={userdata.name}></input>
            </div>
          <div className="role">{userdata.role}</div>
          {
            !userdata.bio ?
            <div className="text-sm mb-2"><input  type="text" placeholder={DATA_USER.bio} ></input></div>
            :
            <></>
          }
          
        </div>

      </div>
      <button className="edit-profile-button" onClick={handleSave}>Save</button>
    </StyledWrapper>}
    </StyledWrapper>
    
  )
}

export default ProfilePage

const StyledWrapper = styled.div`
  .edit-profile-button {
    margin: 0 auto; /* Căn giữa theo chiều ngang */
  display: block;
    display: flex;
    justify-content: center;
    padding: 0.5rem 1rem;
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? "lightblue" : "darkblue"};
    color: ${({ theme }) =>
      theme.scheme === "light" ? "black" : "white"};;
    border: none;
    border-radius: 5rem;
    font-size: 1rem;
    cursor: pointer;
  }

  .edit-profile-button:hover {
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? "skyblue" : "royalblue"};
  }
  > .title {
    padding: 0.25rem;
    margin-bottom: 0.75rem;
  }
  > .content {
    margin-bottom: 1rem;
    border-radius: 1rem;
    width: 100%;
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? "white" : theme.colors.gray4};
    @media (min-width: 768px) {
      padding: 1rem;
    }
    @media (min-width: 1024px) {
      padding: 1rem;
    }
    .top {
      position: relative;
      width: 100%;
      &:after {
        content: "";
        display: block;
        padding-bottom: 100%;
      }
    }
    .mid {
      display: flex;
      padding: 0.5rem;
      flex-direction: column;
      align-items: center;
      .name {
        font-size: 1.25rem;
        line-height: 1.75rem;
        font-style: italic;
        font-weight: 700;
      }
      .role {
        margin-bottom: 1rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
        color: ${({ theme }) => theme.colors.gray11};
      }
      .bio {
        margin-bottom: 0.5rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
      }
    }
  }
`
