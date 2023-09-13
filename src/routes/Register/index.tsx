import styled from "@emotion/styled"
import React from "react"
import { Emoji } from "src/components/Emoji"
import 'bootstrap/dist/css/bootstrap.min.css';
import Levels from "./Levels"
import Status from "./Status"
import Email from "./Email";

import { Form, FormGroup, FormLabel, FormControl, Button } from "react-bootstrap";
import FullName from "./FullName";
import Jobs from "./Job";
// Bootstrap


const Register: React.FC = () => {
   
  return (
      <StyledWrapper>
        <div className="wrapper">
          <div className="top">
            <Emoji>🌎</Emoji>
            <div className="text">Register page</div>
          </div>
         <Form>
          <FullName />  
          <Email />
          <Jobs/>
          <Levels />
          <Status />
          <div className="mt-3 flex">
            <Button variant="warning" type="submit" >
              Ứng tuyển
            </Button>
          </div>
         </Form>
        </div>
      </StyledWrapper>
    )
  }

export default Register

const StyledWrapper = styled.div`
  margin: 0 auto;
  padding: 3rem 1.5rem;
  border-radius: 1.5rem;
  max-width: 56rem;
  background: ${({ theme }) => theme.colors.indigo8};
  > .wrapper {
    display: flex;
    padding-top: 2rem;
    padding-bottom: 2rem;
    flex-direction: column;
    gap: 2.5rem;
    align-items: center;
    > .top {
      display: flex;
    >.text{ 
      font-weight: bold;
      font-size: 2rem;
    }
  }
  }

`
