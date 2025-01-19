import { Routes,Route } from "react-router-dom"
import UserLogin from "./Pages/UserLogin"
import Home from "./Pages/Home"
import UserSignup from "./Pages/UserSignup"
import CaptainLogin from "./Pages/CaptainLogin"
import CaptainSignup from "./Pages/CaptainSignup"
import Start from "./Pages/Start"
import UserProtectedWrapper from "./Pages/UserProtectedWrapper"
import UserLogout from "./Pages/UserLogout"
import CaptainHome from "./Pages/CaptainHome"
import CaptainProtectedWrapper from "./Pages/CaptainProtectedWrapper"
import CaptainLogout from "./Pages/CaptainLogout"
import Riding from "./Pages/Riding"
import CaptainRiding from "./Pages/CaptainRiding"

function App() {
  
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route path="/login" element={<UserLogin />}></Route>
        <Route path="/signup" element={<UserSignup />}></Route>
        <Route path="/captain-login" element={<CaptainLogin />}></Route>
        <Route path="/captain-signup" element={<CaptainSignup />}></Route>
        <Route
          path="/home"
          element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          }
        ></Route>
        <Route
          path="/riding"
          element={
            <UserProtectedWrapper>
              <Riding />
            </UserProtectedWrapper>
          }
        ></Route>
        <Route
          path="/user/logout"
          element={
            <UserProtectedWrapper>
              <UserLogout />
            </UserProtectedWrapper>
          }
        ></Route>

        <Route
          path="/captain-home"
          element={
            <CaptainProtectedWrapper>
              <CaptainHome />
            </CaptainProtectedWrapper>
          }
        ></Route>

        <Route
          path="/captain-riding"
          element={
            <CaptainProtectedWrapper>
            <CaptainRiding/>
            </CaptainProtectedWrapper>
          }
        ></Route>

        <Route
          path="/captain/logout"
          element={
            <CaptainProtectedWrapper>
              <CaptainLogout />
            </CaptainProtectedWrapper>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App
