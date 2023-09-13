
import React, {Component} from "react"
import { Emoji } from "src/components/Emoji"
import { FormGroup, FormLabel, FormControl } from "react-bootstrap";

const Jobs : React.FC = () => {
 
return (
    <FormGroup controlId="formEmail" className="mt-3">
      <FormLabel><Emoji>🌞</Emoji> Ngành ứng tuyển</FormLabel>
      <FormControl type="text" placeholder="" />
    </FormGroup>
  )
}

export default Jobs


