import React, {Component} from "react"
import { Emoji } from "src/components/Emoji"
import { FormGroup, FormLabel, FormControl } from "react-bootstrap";

const FullName : React.FC = () => {
  
return (
    
    <FormGroup controlId="formName" className="mt-3" >
        <FormLabel><Emoji>🧑</Emoji> Họ và tên</FormLabel>
        <FormControl type="text" placeholder="Enter your name" />
    </FormGroup>

  )
}

export default FullName
