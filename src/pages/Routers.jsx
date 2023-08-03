import { Route, Routes } from "react-router-dom";
import Main from "./Main";
import SignUp from "./SignUp";

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}
