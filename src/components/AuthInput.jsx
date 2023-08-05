import React from "react";

export default function AuthInput(props) {
  const {
    inputUserInfo,
    setInputUserInfo,
    isValidEmail,
    setIsValidEmail,
    isValidPassword,
    setIsValidPassword,
  } = props;
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

  return (
    <div className="auth-input-component-container">
      <label htmlFor="emailInput">
        <p>이메일 </p>
        <input
          type="text" // 유효성검사 조건에 추가 조건 부여를 막기 위해 type 변경
          id="emailInput"
          data-testid="email-input"
          onChange={emailInputHandler}
          value={inputUserInfo.email}
        />
        {!isValidEmail ? (
          <p className="invalid-text">이메일에는 "@"가 포함되어야 합니다.</p>
        ) : (
          <p className="valid-text">✅</p>
        )}
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
        {!isValidPassword ? (
          <p className="invalid-text">비밀번호는 8자 이상으로 설정해 주세요</p>
        ) : (
          <p className="valid-text">✅</p>
        )}
      </label>
    </div>
  );
}
