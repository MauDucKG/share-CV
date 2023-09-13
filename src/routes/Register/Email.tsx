import React, {Component} from "react"
import { Emoji } from "src/components/Emoji"
import { FormGroup, FormLabel, FormControl } from "react-bootstrap";

const Email : React.FC = () => {
  

return (
       
    <FormGroup controlId="formEmail" className="mt-3">
      <FormLabel><Emoji>📫</Emoji> Email</FormLabel>
      <FormControl type="email" placeholder="Enter your email" required pattern="[A-Za-z]+" />
    </FormGroup>

  )
}

export default Email
