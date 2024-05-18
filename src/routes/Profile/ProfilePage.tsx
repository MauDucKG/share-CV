import Image from "next/image"
import React, {useEffect, useState} from "react"
import styled from "@emotion/styled"
import { Emoji } from "src/components/Emoji"
import { DATA_USER } from "src/constants"
import { LINK_TO_SERVER } from 'src/constants';
import axios from 'axios';
import { updateUser } from "src/apis/notion-client/updateUser"

type Props = {
  userdata: typeof DATA_USER;
}

const ProfilePage: React.FC<Props> = ({ userdata }) => {
  const [isloading, setIsLoading] = useState(false);
  const [file, setFile] = useState("")
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(userdata.name)
  const [avatar, setAvatar] = useState(userdata.avatar)
  const [email, setEmail] = useState(userdata.email ? userdata.email : "")
  const [phone, setPhone] = useState(userdata.phone)
  const [bio, setBio] = useState(userdata.bio ? userdata.bio : "")
  const [company, setCompany] = useState(userdata.company ? userdata.company : "")
  const [location, setLocation] = useState(userdata.location ? userdata.location : "")

  const handleUpload = async () => {
    try {
      setLoading(true);

      const data = new FormData();
      if (file) {
        data.append("my_file", file);
      }
      const res = await axios.post(`${LINK_TO_SERVER}/upload`, data);
      setAvatar(res.data.url)
      
    } catch (error : any) {
      alert(error.message);
    }  finally {
      setLoading(false);
    }
  };

  const [isEdit, setisEdit] = useState(false)
  const handleEditProfile = () => {
    setisEdit(true)
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("access_token")
      console.log(userdata._id)
      const userdata_new = await updateUser(userdata._id, name, avatar, email, phone, bio, company, location, token)
      localStorage.setItem("user_data", JSON.stringify(userdata_new))
    }
    catch (error : any) {
      alert(error.message);
    }  finally {
      setIsLoading(false);
      setisEdit(false);
      window.location.reload();
    }
    
  };

  return (
    
    <StyledWrapper>
      {!isEdit 
      ? <StyledWrapper>
        <div className="title">
          <Emoji>💻</Emoji> Profile
        </div>
        <div className="content">
          <div className="white"> {'\u00a0'.repeat(80)} </div>
          {userdata.avatar ?
          <div className="top">
            <Image src={userdata.avatar} fill alt="" />
          </div>
          : 
          <></>
          }
          <div className="mid">
            <div className="name">{userdata.name ? userdata.name : userdata.login}</div>
            <div className="role">{userdata.role}</div>
            {
              !userdata.bio ?
              <div className="bio"> {DATA_USER.bio} </div>
              :
              <div className="bio"> {userdata.bio}</div>
            }
            
          </div>

        </div>
        <button className="edit-profile-button" onClick={handleEditProfile}>Edit Profile</button>
      </StyledWrapper>

      : 
      // EditPage
      <StyledWrapper>
        <div className="title">
          <Emoji>💻</Emoji> Edit Profile
        </div>

        <div className="content">
          <div className="top-input">
            <Emoji>📝</Emoji> Name 
          </div>

          <input
            className="mid1"
            type="text"
            placeholder={userdata.name}
            value={name || userdata.name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="top-input">
            <Emoji>📝</Emoji> Avatar (Select File)
          </div>
          <input
            className="mid1"
            type="text"
            placeholder={userdata.avatar}
            value={avatar || userdata.avatar}
            // onChange={(e) => setAvatar(e.target.value)}
          />
          {avatar ?
          <div className="top">
            <Image src={avatar} fill alt="" />
          </div>
          : 
          <></> 
          }
          
          <div className="upload" >
            <input
              id="file" type="file"
              onChange={(e : any) =>
                setFile(e.target.files[0])
              }
              multiple={false}
            />

            <div className="form-submit">
              <button
                className="btn-submit"
                onClick={handleUpload} 
              >
                {loading ? "Uploading" : "Upload"}
              </button>
            
            </div>
               
          </div>
            

          <div className="top-input">
            <Emoji>📝</Emoji> Email 
          </div>
          <input
            className="mid1"
            type="text"
            placeholder={userdata.email ? userdata.email : "Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="top-input">
            <Emoji>📝</Emoji> Phone 
          </div>
          <input
            className="mid1"
            type="text"
            placeholder={userdata.phone ? userdata.phone : "Phone"}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <div className="top-input">
            <Emoji>📝</Emoji> Bio 
          </div>
          <input
            className="mid1"
            type="text"
            placeholder={userdata.bio ? userdata.bio : "Bio"}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <div className="top-input">
            <Emoji>📝</Emoji> Company 
          </div>
          <input
            className="mid1"
            type="text"
            placeholder={userdata.company ? userdata.company : "Company"}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          <div className="top-input">
            <Emoji>📝</Emoji> Location 
          </div>
          <input
            className="mid1"
            type="text"
            placeholder={userdata.location ? userdata.location : "Location"}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <button className="edit-profile-button" onClick={handleSave}>{isloading ? "Upload ..." : "Upload"}</button>
    </StyledWrapper>}
    </StyledWrapper>
    
  )
}

export default ProfilePage

const StyledWrapper = styled.div`
.upload {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 0.9fr 0.1fr; 
  grid-gap: 1rem; 
  align-items: center; 
}

.form-submit {
  text-align: center;
}

.btn-submit {
  padding: 0.5rem 1.25rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.blue4};
}

  .white {
    color: white;
    font-size: 0.875rem;
    text-align: center;
    display: flex
    align-items: center;


  }
  .top-input {
    padding: 0.25rem;
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
    font-size: 1rem; 
  }
  .mid1 {
    margin-bottom: 0.75rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    border-radius: 1rem;
    outline-style: none;
    width: 100%;
    font-size: 1rem;
    background-color: ${({ theme }) => theme.colors.gray7};
  }
  .edit-profile-button {
    margin: 0 auto; 
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
      justify-content: center:
      
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
        text-align: center;
      }
    }
  }
`
