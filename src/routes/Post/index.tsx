import React, { useState } from "react"
import styled from "@emotion/styled"
import axios from 'axios';
import { Emoji } from "src/components/Emoji"
import TitleInput from "./TitleInput"
import ContentInput from "./ContentInput"
import SummaryInput from "./SummaryInput"
import ImageInput from "./ImageInput"
import { LINK_TO_SERVER } from 'src/constants';
import { postPost } from "src/apis"
import Image from "next/image"

const Post: React.FC = () => {
  const [title, setTitle] = useState("")
  const [summary, setSummary] = useState("")
  const [content, setContent] = useState("")

  const [thumbnail, setThumbnail] = useState("")
  const [isPost, setIsPost] = useState(false) 
  const [file, setFile] = useState("")
  const [res, setRes] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    try {
      setLoading(true);

      const data = new FormData();
      console.log(file)
      if (file) {
        data.append("my_file", file);
      }
      console.log(data)
      const res = await axios.post(`${LINK_TO_SERVER}/upload`, data);
      setThumbnail(res.data.url)
      
    } catch (error : any) {
      alert(error.message);
    }  finally {
      setLoading(false);
    }
  };

  const handlePost = async () => {
    setIsPost(true)
    let slug = await postPost(title, summary, content, thumbnail)
    window.location.href = `/post/${slug}`
    // window.location.href = `/`
  }

  return (
    <StyledWrapper>
      <div className="wrapper">
        <div className="top">
          <Emoji>📣</Emoji>
        </div>
        <div className="text">Post artical !!!</div>
        <div className="form">
          <ImageInput/> 
          <div style={{ display: 'flex' }}>
            <input
              id="file" type="file"
              onChange={(e : any) =>
                setFile(e.target.files[0])
              }
              multiple={false}
            />

            <div className="form-submit" style={{ marginLeft: 'auto' }} >
              <button
                className="btn-submit"
                onClick={handleUpload} // Use handleRegister function for onClick event
              >
                {loading ? "Uploading ..." : "Upload"}
              </button>
            
            </div>
              
            </div>
            {
              thumbnail ? 
                <Image
                src={thumbnail}
                alt={title}
                width={600} 
                height={400} 
              />
              : <></>
            }
          <TitleInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
           <SummaryInput
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <ContentInput value={content} onChange={(e) => setContent(e.target.value)} />
          <div className="form-submit">
            {isPost || (
              <button
                className="btn-submit"
                onClick={handlePost} // Use handleRegister function for onClick event
                disabled={isPost} // Disable button when registering
              >
                Post
              </button>
            )}
            {isPost && (
              <p className="btn-submit1">Please wait a moment</p>
            )}
          </div>
        </div>
      </div>
    </StyledWrapper>
  )
}

export default Post

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
