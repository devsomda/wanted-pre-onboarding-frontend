import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { signUp } from "../apis/requests";
import AuthInput from "../components/AuthInput";

export default function SignUp() {
  // 유저정보: 이메일, 비밀번호 입력 값
  const [inputUserInfo, setInputUserInfo] = useState({
    email: "",
    password: "",
  });

  // 유효성 검사 통과 여부
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  // 유효성 검사에 따른 버튼 disable 값 (Assignment1)
  const isDisabled = !(isValidEmail && isValidPassword);

  const navigate = useNavigate();

  // Token 검증
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/todo");
    }
  }, []);

  // 회원가입
  const submitHandler = async (e) => {
    e.preventDefault();

    console.log("회원가입 준비 완료");
    try {
      await signUp(inputUserInfo.email, inputUserInfo.password);
      alert("회원가입이 완료되었습니다!");
      navigate("/signin");
    } catch (error) {
      console.error("회원가입에 실패했습니다.", error);
    }
  };

  return (
    <div className="sign-up-page-container">
      <h3>회원가입</h3>
      <form action="submit" onSubmit={submitHandler}>
        <AuthInput
          inputUserInfo={inputUserInfo}
          setInputUserInfo={setInputUserInfo}
          isValidEmail={isValidEmail}
          setIsValidEmail={setIsValidEmail}
          isValidPassword={isValidPassword}
          setIsValidPassword={setIsValidPassword}
        />
        <button
          type="submit"
          data-testid="signup-button"
          disabled={isDisabled}
          className="submit-button"
        >
          회원가입
        </button>
      </form>
    </div>
  );
}
