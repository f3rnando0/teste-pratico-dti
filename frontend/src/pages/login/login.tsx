import { useState } from "react";
import "./login.sass";
import { useNavigate } from "react-router-dom";
import { validate } from "../../lib/utils/validator";
import Button from "../../components/submitButton/submitButton";
import { useLoginMutation } from "../../lib/features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../lib/features/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const [showLoader, setShowLoader] = useState(false);

  const resetError = (type: string): void => {
    switch (type) {
      case "password":
        if (passwordError) setPasswordError("");
        break;
      case "email":
        if (emailError) setEmailError("");
        break;
    }
  };

  const handleRedirect = (): void => {
    navigate("/register");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.value) return;
    const isValid = validate(e.target.name, e.target.value);

    switch (e.target.name) {
      case "email":
        if (!isValid.success)
          return setEmailError(isValid.error.errors[0].message);
        return setEmail(e.target.value);
      case "password":
        if (!isValid.success)
          return setPasswordError(isValid.error.errors[0].message);
        return setPassword(e.target.value);
    }
    resetError(e.target.name);
  };

  const handleSubmit = async () => {
    if (!email || !password) return;
    setShowLoader(true);

    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...userData }));
      navigate("/dashboard");
    } catch (error: any) {
      setPasswordError(
        error.data.errors[0].message === "Unathorized"
          ? "E-mail ou senha inválidos."
          : "Unathorized"
      );
      return setShowLoader(false);
    }
  };

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div key={"random"}>
      <main>
        <div className="wrapper">
          <span id="first">
            Tiny<span id="other">Reminder</span>
          </span>
          <div className="inputs">
            <input
              type="email"
              placeholder="E-mail"
              name="email"
              autoComplete="email"
              onChange={handleChange}
              onMouseUp={() => resetError("email")}
            />
            <span className="error-text">{emailError}</span>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              onMouseUp={() => resetError("password")}
            />
            <span className="error-text">{passwordError}</span>
          </div>
          <div className="btn">
            <Button
              text="Login"
              onSubmit={handleSubmit}
              loading={showLoader}
              disabled={showLoader}
            />
          </div>
          <span id="register" onClick={handleRedirect}>
            Não possui uma conta?
          </span>
        </div>
      </main>
    </div>
  );

  return content;
};

export default Login;
