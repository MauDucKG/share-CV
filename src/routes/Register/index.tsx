import React, { useState } from "react";
import styled from "@emotion/styled";
import { Emoji } from "src/components/Emoji";
import FullNameInput from "./FullNameInput";
import MajorInput from "./MajorInput";
import CVInput from "./CVInput";
import { postCVData } from "src/apis";

const Register: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [major, setMajor] = useState("");
  const [cvText, setCvText] = useState("");

  const handleRegister = () => {
    // Gửi dữ liệu đăng ký đến máy chủ hoặc xử lý theo cách bạn muốn ở đây
    console.log("Họ tên:", fullName);
    console.log("Ngành ứng tuyển:", major);
    console.log("CV:", cvText);
  };

  return (
    <StyledWrapper>
      <div className="wrapper">
        <div className="top">
          <Emoji>📝</Emoji>
        </div>
        <div className="text">Register by submitting your CV !!!</div>
        <div className="form">
          <FullNameInput value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <MajorInput value={major} onChange={(e) => setMajor(e.target.value)} />
          <CVInput value={cvText} onChange={(e) => setCvText(e.target.value)} />
          <div className="form-submit">
            <button className="btn-submit" onClick={handleRegister}>Register</button>
          </div>
        </div>

      </div>
    </StyledWrapper>
  );
};

export default Register;

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
      width: 70%;
      color: ${({ theme }) => theme.colors.gray11};
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
      font-size: 1.5rem; /* adjust this value to your preference */
    }
  }
`;
