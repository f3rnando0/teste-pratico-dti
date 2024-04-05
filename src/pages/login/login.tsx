import { useState } from "react";
import "./login.sass";

export default function Login() {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function resetError(type: string): void {
    switch (type) {
      case "password":
        if (passwordError) setPasswordError("");
        break;
      case "email":
        if (emailError) setEmailError("");
        break;
    }
  }

  return (
    <div key={"random"}>
      <main>
        <div className="wrapper">
          <span id="first">
            Tiny<span id="other">Reminder</span>
          </span>
          <div className="inputs">
            <input
              type="email"
              placeholder="Email"
              onMouseUp={() => resetError("email")}
            />
            <span className="error-text">{emailError}</span>
            <input
              type="password"
              placeholder="Password"
              onMouseOut={() => resetError("password")}
            />
            <span className="error-text">{passwordError}</span>
          </div>
          <div className="btn">
            <button>Login</button>
          </div>
          <span id="register">Don't have an account?</span>
        </div>
      </main>
    </div>
  );
}
