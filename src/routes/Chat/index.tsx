import React, { useEffect, useState } from "react"
import styled from "@emotion/styled"
import axios from "axios"
import { LINK_TO_SERVER } from "src/constants"
import ReactMarkdown from "react-markdown"

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Array<string>>([])
  const [newMessage, setNewMessage] = useState<string>("")
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      setLoading(true); // Bắt đầu hiển thị trạng thái loading
  
      setMessages([...messages, newMessage]);
      setNewMessage("");
  
      try {
        // Gửi yêu cầu tới backend
        const response = await axios.post(LINK_TO_SERVER + "/chat", { text: newMessage });
  
        setMessages([...messages, newMessage, response.data.message]); // Extract response data
      } catch (error) {
        console.error(error);
      }
  
      setLoading(false); // Kết thúc hiển thị trạng thái loading
    }
  };

  const handleNewMessageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewMessage(event.target.value)
  }

  return (
    <StyledWrapper>
      <div className="top">💬 Chat with share-CV !!!</div>
      <div className="wrapper">
        <div className="messages">
          {messages.map((message, index) => (
            <div
              className={
                index % 2 === 0 ? "message-container user" : "message-container"
              }
              key={index}
            >
              {index % 2 === 0 ? (
                <div className="message user1">
                  <div>{message}</div>
                </div>
              ) : (
                <div className="message">
                  <ReactMarkdown className="markdown">{message}</ReactMarkdown>
                </div>
              )}
            </div>
          ))}
        </div>
        {loading ? ( // Hiển thị trạng thái loading nếu đang gửi yêu cầu tới backend
          <div className="loading">☕ Loading...</div>
        ) : (
          <div className="input-area">
            <input
              value={newMessage}
              onChange={handleNewMessageChange}
              onKeyPress={handleSendMessage}
              placeholder="Nhập tin nhắn ->"
            />
          </div>
        )}
      </div>
    </StyledWrapper>
  );
}

export default Chat

const StyledWrapper = styled.div`
  margin: 0 auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 1.5rem;
  padding-bottom: 3rem;
  max-width: 56rem;

  .loading {
    text-align: center;
    padding: 1rem;
    font-size: 1.2rem;
    color: #ddd;
  }

  .top {
    text-align: center;
    padding-bottom: 1rem;
    font-size: 1.875rem;
    line-height: 2.25rem;
    color: ${({ theme }) => theme.colors.gray11};
  }

  .wrapper {
    height: 80vh;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    border-radius: 1.5rem;
    outline-style: none;
    align-items: center;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(0, 0, 0, 0.06);
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? "white" : theme.colors.gray4};
  }

  .messages {
    height: calc(80vh - 70px);
    flex-direction: column;
    overflow: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, and Opera */
  }
  }

  .message-container {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    color: ${({ theme }) => theme.colors.gray11};
  }

  .message {
    border-radius: 1rem;
    padding: 0em 1em;
    margin: 0.5em 0;
    display: inline-block;
    max-width: 80%;
    background-color: ${({ theme }) => theme.colors.green3};
  }

  .user1 {
    background-color: ${({ theme }) => theme.colors.gray3};
    padding: 1em;
  }

  .user {
    direction: rtl;
    justify-content: flex-start;
  }

  .input-area {
    display: flex;
    align-items: center;
    padding-top: 0.65rem;
  }

  input {
    padding-top: 0.75rem;
    padding-bottom: 0.65rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    border-radius: 1rem;
    outline-style: none;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.gray3};
  }
`
