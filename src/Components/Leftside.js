import React,{useState,useEffect} from 'react'
import {Dropdown,ListGroup,Modal,Button,Form} from "react-bootstrap"
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom"
import { getDatabase, ref, onValue,set} from "firebase/database";
import { getStorage, ref as refer, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useDispatch } from 'react-redux';

const Leftside = (props) => {
    const db = getDatabase();
    const auth = getAuth();
    const [userss, setUserss] = useState([])
    const [activeuser, setActiveuser] = useState("")
    const [uploadimage, setUploadimage] = useState("")
    const [updateimage, setUpdateimage] = useState("")

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();
    const disptch = useDispatch()
    const handleSignout = () =>{
        signOut(auth).then(() => {
            navigate("/login")
            }).catch((error) => {
            // An error happened.
        });
    }

    let userarr = []
    useEffect(()=>{
        const usersRef = ref(db, 'friends/');
            onValue(usersRef, (snapshot) => {
                snapshot.forEach(user=>{
                    userarr.push(user.val())   
                })        
                setUserss(userarr)
              });
              
        },[props])


    const handleUser = (id) =>{
      console.log(id)
            setActiveuser(id)
            disptch({type:"ACTIVE_USER",payload:id})
    }
    const handleImage = (e) =>{
        setUploadimage(e.target.files[0])
    }
    const handlePictureupload = () =>{
        const storage = getStorage();
        const storageRef = refer(storage, `profileimages/${auth.currentUser.uid}/${uploadimage.name}`);
        const uploadTask = uploadBytesResumable(storageRef, uploadimage);
        uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      set(ref(db, 'users/' + auth.currentUser.uid), {
        username: auth.currentUser.displayName,
        email:auth.currentUser.email,
        id:auth.currentUser.uid,
        photoURL: downloadURL
      });
      setShow(false)
    });
  }
);

    }


  return (
    <div style={{background:"gray", height:"100vh",color:"white",textAlign:"center"}}>
        <img src={updateimage} style={{width:"100px",margin:"50px 0 0 0"}} alt="img"/>
        <Dropdown style={{textAlign:"center"}}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
        {props.username}
        </Dropdown.Toggle>

        <Dropdown.Menu>
        <Dropdown.Item eventKey="1" onClick={handleShow}>Change Profile</Dropdown.Item>
        <Dropdown.Item eventKey="1" onClick={handleSignout}>Log Out</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>

        <h3 style={{paddingTop:"30px",color:"#222"}}>Friends</h3>
        
        <ListGroup style={{marginTop:"20px", height:"300px",overflowY:"scroll"}}>
            {userss.map(item=>(
              item.senderid !== auth.currentUser.uid ? 
                <ListGroup.Item style={activeuser == item.senderid
                ? activecss : activecss2} onClick={()=>handleUser(item.senderid)}>{item.sendername}</ListGroup.Item>
                :
                ""
      ))}
        </ListGroup>



      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control type="file" onChange={handleImage} />
            </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePictureupload}>
            Upload 
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

let activecss = {
    color:"red",
    cursor:"pointer"
}
let activecss2 = {
    color:"black",
    cursor:"pointer"
}

export default Leftside
