import { useState } from "react";
import { useNavigate } from "react-router";
import { signIn } from "../apis/requests";
import AuthInput from "../components/AuthInput";

export default function SignIn() {
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

  // 로그인
  const submitHandler = async (e) => {
    e.preventDefault();

    console.log("로그인 준비 완료");
    try {
      const res = await signIn(inputUserInfo.email, inputUserInfo.password);
      console.log("로그인이 완료되었습니다!", res);
      // token 저장
      localStorage.setItem("token", res.access_token);
      navigate("/todo");
    } catch (error) {
      console.error("로그인에 실패했습니다.", error);
    }
  };

  return (
    <div>
      <h3>로그인</h3>
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
          data-testid="signin-button"
          disabled={isDisabled}
          className="submit-button"
        >
          로그인
        </button>
      </form>
    </div>
  );
}
