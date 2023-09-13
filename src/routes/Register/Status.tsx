import React, {Component} from "react"
import { Emoji } from "src/components/Emoji" 
import {  FormGroup, FormLabel, FormCheck} from "react-bootstrap";


const Status : React.FC = () => {
    const workStatus = [ 
        {id: '1', name: 'Sẵn sàng đi làm ngay'}, 
        {id: '2', name: 'Hiện đang làm việc ở công ty khác'},
        {id: '3', name: 'Đang có dự định nghỉ việc'}
    ]

return (
  
 
<FormGroup controlId="formEmail" className="mt-3">
     <FormLabel><Emoji>🧑‍🏫</Emoji> Trạng thái ứng viên</FormLabel>
     {workStatus.map((status) => ( 
       <FormCheck key={status.id} value={status.name} label={status.name} type="radio" /> 
     ))}
</FormGroup>

  )
}

export default Status