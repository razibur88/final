import Home from "./Components/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import {Routes, Route} from "react-router-dom"

function App() {
  return (
   <>
   <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
   </Routes>
   </>
  );
}
export default App;
