import { Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";

export default function Routers() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}
