import React,{useState,useEffect} from 'react'
import {InputGroup,Button,FormControl,Card} from "react-bootstrap"
import {Send} from "react-bootstrap-icons"
import { getDatabase, ref, set,push,onValue } from "firebase/database";
import { getAuth } from 'firebase/auth'
import moment from 'moment'
import { useSelector } from 'react-redux'

const Middle = () => {
  const auth = getAuth()
  const db = getDatabase();
  const [text, SetText] = useState("")
  const [message, SetMessage] = useState([])

  const data = useSelector((id)=>id.activeuserid)
  console.log(data)

  const handletext = (e) =>{
    SetText(e.target.value)
  }


  const handleMsg = () =>{
    set(push(ref(db, 'massages/')), {
      msg: text,
      sender: auth.currentUser.uid,
      receiver : data.id,
      sendername: auth.currentUser.displayName,
      date:Date(),
    });
  }


 
  useEffect(()=>{
    const starCountRef = ref(db, 'massages/');
    onValue(starCountRef, (snapshot) => {
      let msgarr = []
      snapshot.forEach(msg=>{
        msgarr.push(msg.val())
      })
      SetMessage(msgarr)
    });
  },[])



  return (
      <>
      <div style={{height:"95vh",background:"pink", overflowY:"scroll"}}>
          {message.map(item=>(
            (item.sender == auth.currentUser.uid && item.receiver == data.id) ||  (item.sender == data.id && item.receiver == auth.currentUser.uid) ?
            <div style={ item.sender == auth.currentUser.uid ? maraling : maraling2 }>
               <Card>
                <Card.Body>
                    <Card.Title>{item.sendername}</Card.Title>
                    <Card.Text>
                        {item.msg}
                    </Card.Text>
                </Card.Body>
              </Card>
              <span style={{paddingLeft:"12px"}}> {moment(item.date).fromNow()}</span>
            </div> 
           
            
            :
            ""
          ))}
       
          

      
      </div>
      <InputGroup>
    <FormControl
      onChange={handletext}
      placeholder="Write Your massage"
    />
    <Button variant="outline-secondary" onClick={handleMsg}><Send/></Button>
    <Button variant="outline-secondary">Upload</Button>
  </InputGroup>
  </>
    
  )
}

let maraling = {
  width:"390px",
  marginLeft:"auto"
}
let maraling2 = {
  width:"390px",
  marginRight:"auto"
}

export default Middle
