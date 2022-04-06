import React,{useState} from 'react'
import Leftside from './Leftside';
import Middle from './Middle';
import Rightside from './Rightside';
import { useNavigate } from "react-router-dom"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Col,Row } from 'react-bootstrap';

const Home = () => {
  const [username, setUsername] = useState()
  const [creation, setCreation] = useState()
  const [id, setId] = useState()
  const [url, setUrl] = useState()

  const auth = getAuth();
  const navigate = useNavigate();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setId(user.uid)
        setUrl(user.photoURL)
        setUsername(user.displayName)
        setCreation(user.metadata.creationTime)
      } else {
        navigate("/login")
      }
    });
      return (
        <div>
         
            <Row style={{margin:"0"}}>
              <Col sm={3} style={{padding:"0"}}>
              <Leftside username= {username} url={url} id={id}/>
              </Col>
              <Col sm={6} style={{padding:"0"}}>
              <Middle/>
              </Col>
              <Col sm={3} style={{padding:"0"}}>
              <Rightside id={id} creation={creation}/>
              </Col>
            </Row>
          
         
        </div>
      )
    }

export default Home
