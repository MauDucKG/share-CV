import React, { useState } from "react";
import styled from "@emotion/styled";
import { Emoji } from "src/components/Emoji";
import EmailInput from "./EmailInput";
import JDInput from "./JDInput";
import { postJD } from "src/apis";

const Receive: React.FC = () => {
  const [email, setEmail] = useState("");
  const [jdText, setJdText] = useState("");

  const handleRegister = () => {
    // Gửi dữ liệu đăng ký đến máy chủ hoặc xử lý theo cách bạn muốn ở đây
    console.log("Email:", email);
    console.log("JD:", jdText);
  };

  return (
    <StyledWrapper>
      <div className="wrapper">
        <div className="top">
          <Emoji>✉️</Emoji>
        </div>
        <div className="text">Register to receive CV !!!</div>
        <div className="form">
          <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
          <JDInput value={jdText} onChange={(e) => setJdText(e.target.value)} />
          <div className="form-submit">
            <button className="btn-submit" onClick={handleRegister}>Register</button>
          </div>
        </div>

      </div>
    </StyledWrapper>
  );
};

export default Receive;

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
      width: 90%; // Đặt giá trị mặc định là 100%
      color: ${({ theme }) => theme.colors.gray11};

      @media (min-width: 768px) { // Chỉ áp dụng cho màn hình có chiều rộng từ 768px trở lên
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
  }
`;
