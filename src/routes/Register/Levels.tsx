import React, {Component} from "react"
import { Emoji } from "src/components/Emoji"
import { FormGroup, FormLabel, FormCheck } from "react-bootstrap";

const Levels : React.FC = () => {
  const levels = [ 
    {id : '1' , name: 'Intern', to:'/intern'}, 
    {id : '2' , name: 'Fresher', to:'/fresher'}, 
    {id : '3' , name: 'Junior', to:'/junior'}, 
    {id : '4' , name: 'Middle', to:'/middle'},  
    {id : '5' , name: 'Senior', to:'/senior'}, 
]

return (
    
    <FormGroup controlId="formEmail" className="mt-3">
      <FormLabel><Emoji>🏋🏾‍♀️</Emoji> Trình độ ứng tuyển</FormLabel>
      {levels.map((level) => ( 
        <FormCheck key={level.id} value={level.name} label={level.name} type="radio" /> 
      ))}
    </FormGroup>
    
  )
}

export default Levels

