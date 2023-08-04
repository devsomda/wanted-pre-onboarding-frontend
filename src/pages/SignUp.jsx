import { useState } from "react";
import { useNavigate } from "react-router";
import { signUp } from "../apis/requests";

export default function SignUp() {
  // 유저정보: 이메일, 비밀번호 입력 값
  // !!! 해당 부분 컴포넌트 분리 예정
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

  // 이메일 입력
  const emailInputHandler = (e) => {
    // 입력값 유효성 검사 (Assignment1)
    if (e.target.value.includes("@")) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
    // 입력값 갱신
    const changedInfo = { ...inputUserInfo };
    changedInfo.email = e.target.value;
    setInputUserInfo(changedInfo);
  };

  // 비밀번호 입력
  const passwordInputHandler = (e) => {
    // 입력값 유효성 검사 (Assignment1)
    if (e.target.value.length >= 8) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }
    // 입력값 갱신
    const changedInfo = { ...inputUserInfo };
    changedInfo.password = e.target.value;
    setInputUserInfo(changedInfo);
  };

  // 회원가입
  const submitHandler = async (e) => {
    e.preventDefault();

    console.log("회원가입 준비 완료");
    try {
      const response = await signUp(
        inputUserInfo.email,
        inputUserInfo.password
      );
      alert("회원가입이 완료되었습니다!");
      navigate("/signin");
    } catch (error) {
      console.error("회원가입에 실패했습니다.", error);
    }
  };

  return (
    <div>
      <h3>회원가입</h3>
      <form action="submit" onSubmit={submitHandler}>
        <label htmlFor="emailInput">
          <p>이메일 </p>
          <input
            type="text" // 유효성검사 조건에 추가 조건 부여를 막기 위해 type 변경
            id="emailInput"
            data-testid="email-input"
            onChange={emailInputHandler}
            value={inputUserInfo.email}
          />
          {!isValidEmail && <p>이메일에는 "@"가 포함되어야 합니다.</p>}
        </label>
        <label htmlFor="passwordInput">
          <p>비밀번호</p>
          <input
            type="password"
            id="passwordInput"
            data-testid="password-input"
            onChange={passwordInputHandler}
            value={inputUserInfo.password}
          />
          {!isValidPassword && <p>비밀번호는 8자 이상으로 설정해 주세요</p>}
        </label>
        <button type="submit" data-testid="signup-button" disabled={isDisabled}>
          회원가입
        </button>
      </form>
    </div>
  );
}
