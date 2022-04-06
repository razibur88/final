import React,{useState} from 'react'
import { useNavigate,Link } from "react-router-dom"
import {Container, Form,Row,Col,Button,Alert} from 'react-bootstrap'
import { DiamondFill } from 'react-bootstrap-icons';
import { updateProfile } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import {getAuth, createUserWithEmailAndPassword} from '../firebase'

const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmpass, setConfirmpass] = useState("")
    const [err, setErr] = useState("")
    const [succmsg, setSuccmsg] = useState("")
    const navigate = useNavigate();
    const db = getDatabase();

    const handleUser = (e) =>{
      setUsername(e.target.value)
    }
    const handleEmail = (e) =>{
      setEmail(e.target.value)
    }
    const handlePassword = (e) =>{
      setPassword(e.target.value)
    }
    const handleConfirmpass = (e) =>{
      setConfirmpass(e.target.value)
    }

    const handleClick = (e) =>{
        e.preventDefault()
        if(!username || !email || !password || !confirmpass ){
          setErr("Please all filled fill up !")
        }else if(password.length < 7 || confirmpass.length < 7){
          setErr("Password maximum 8 digit !")
        }else if(password !== confirmpass){
          setErr("Passowrd does not Matching")
        }else{
          const auth = getAuth();
          createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            set(ref(db, 'users/' + userCredential.user.uid), {
              username: username,
              email:email,
              photoURL:"https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg"
            });
            updateProfile(auth.currentUser, {
              displayName: username,
              photoURL:"https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg"
            }).then(() => {
              setSuccmsg("Account Created Successfully Done")
              setUsername("")
              setEmail("")
              setPassword("")
              setConfirmpass("")
              navigate("/login")
            }).catch((error) => {
              console.log(error);
            });
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              // ..
            });
        }

    }

  return (
    <div style={{background:"teal", height:"100vh"}}>
      <Container>
        <Row style={{justifyContent:"center", textAlign:"center", paddingTop:"100px"}}>
          <Col sm={6}>
            <DiamondFill style={{color:"#fff", fontSize:"40px"}}/>
            <h2  style={{color:"#fff", fontSize:"30px",paddingTop:"10px",paddingBottom:"10px"}}>Registration From</h2>
            {err ? 
            <Alert variant="danger">
              <h4>{err}</h4>
            </Alert>
            : 
            "" 
            }
            
            {succmsg ? 
            <Alert variant="success">
              <h4>{succmsg}</h4>
            </Alert>
            : 
            "" 
            }

          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control type="text" onChange={handleUser} placeholder="Username" value={username} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control type="email" onChange={handleEmail} placeholder="Enter Your Email Name" value={email}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control type="password" onChange={handlePassword} placeholder="Enter Your Password" value={password} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control type="password" onChange={handleConfirmpass} placeholder="Enter Your Confirm Password" value={confirmpass} />
            </Form.Group>
            <Button onClick={handleClick} variant="light">Register Now</Button>
            <span style={{color:"#fff",paddingLeft:"10px"}}>Have an Account Go <Link style={{color:"#222"}} to={"/login"}> login</Link></span>
          </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Register
