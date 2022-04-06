import React,{useState} from 'react'
import { useNavigate,Link } from "react-router-dom"
import {Container,Row,Form,Button,Col,Alert} from 'react-bootstrap'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState("")
    const navigate = useNavigate();
   
    const handleEmail = (e) =>{
      setEmail(e.target.value)
    }
    const handlePassword = (e) =>{
      setPassword(e.target.value)
    }
  

    const handleClick = (e) =>{
        e.preventDefault()
        if(!email || !password){
          setErr("Please all filled fill up !")
        }else if(password.length < 7){
          setErr("password must be 8 digit")
        }else{
          const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                console.log("ami login hoiaci")
                navigate("/")
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
              });
        }
    }
  return (
    <div style={{background:"teal", height:"100vh"}}>
      <Container>
        <Row style={{justifyContent:"center", textAlign:"center", paddingTop:"100px"}}>
          <Col sm={6}>
            <h2  style={{color:"#fff", fontSize:"30px",paddingTop:"10px",paddingBottom:"10px"}}>Login</h2>
            {err ? 
            <Alert variant="danger">
              <h4>{err}</h4>
            </Alert>
            : 
            "" 
            }
            
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control type="email" onChange={handleEmail} placeholder="Enter Your Email Name" value={email}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control type="password" onChange={handlePassword} placeholder="Enter Your Password" value={password} />
            </Form.Group>
            <Button onClick={handleClick} variant="light">Sign In</Button>
            <span style={{color:"#fff",paddingLeft:"10px"}}>Have not an Account Go <Link style={{color:"#222"}} to={"/register"}> Register</Link></span>
          </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login
