import React, { useState,useEffect } from 'react'
import moment from 'moment'
import { getAuth } from 'firebase/auth'
import {Dropdown,ListGroup,Button,Form} from "react-bootstrap"
import { getDatabase, ref, onValue,set,push} from "firebase/database";

const Rightside = (props) => {
 
  const db = getDatabase();
  const auth = getAuth()
  const [users,setUsers] = useState([])
  const [requsers,setRequsers] = useState([])
  const [updateimage, setUpdateimage] = useState("")

  const usersRef = ref(db, 'users/');
  let userarr = []
  useEffect(()=>{

          onValue(usersRef, (snapshot) => {
              snapshot.forEach(user=>{
                  if(user.key !== props.id){
                      let userinfo = {
                          ...user.val(),
                          id: user.key
                      }
                      userarr.push(userinfo)
                      console.log(props.id)
                      
                    }else{
                      setUpdateimage(user.val().photoURL)
                    }
                  })        
                  setUsers(userarr)
              
          });
      },[])

      let handleAdd = (name,id) =>{
        set(push(ref(db, 'add/')), {
          receivername: name,
          receiverid:id,
          sender:auth.currentUser.uid,
          sendername:auth.currentUser.displayName
        });
      }

  const reqsRef = ref(db, 'add/');
  let reqarr = []
  useEffect(()=>{
          onValue(reqsRef, (snapshot) => {
              snapshot.forEach(user=>{
                  if(user.key !== props.id){
                      let userinfo = {
                          ...user.val(),
                          id: user.key
                      }
                      reqarr.push(userinfo)
                  }
              })        
              setRequsers(reqarr)
          });
      },[])


  const handleActive = (id,name,id2) =>{
    console.log(id,name,id2)
    set(push(ref(db, 'friends/')), {
      senderid: id,
      sendername:name,
      receiverid:id2
    });
  }

  return (
    <div style={{background:"gray", height:"100vh",color:"white"}}>
      <h2>MetaData</h2>
      {moment(props.creation).fromNow()}
      <ListGroup>
        <h2>Users</h2>
            {users.map(item=>(
                <ListGroup.Item>{item.username}<Button variant="secondary" onClick={()=>handleAdd(item.username,item.id)}>Add
              </Button></ListGroup.Item>
            ))}
      </ListGroup>


      <ListGroup>
        <h2>Request</h2>
        {requsers.map(item=>(
          
          item.sender !== auth.currentUser.uid ?
          <ListGroup.Item>{item.sendername} <Button variant="secondary" onClick={()=>handleActive(item.sender,item.sendername,item.receiverid)}>Active</Button></ListGroup.Item>
          :
          ""
        ))}
      </ListGroup>
    </div>
  )
}

export default Rightside
