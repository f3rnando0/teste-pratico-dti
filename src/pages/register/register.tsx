import { useState } from "react";
import "./register.sass";
import { useNavigate } from "react-router-dom";
import { validate } from "../../lib/utils/validator";
import Button from "../../components/submitButton/submitButton";

const Register =() => {
  const navigator = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");

  const [showLoader, setShowLoader] = useState(false);

  const resetError = (type: string): void => {
    switch (type) {
      case "password":
        if (passwordError) setPasswordError("");
        break;
      case "email":
        if (emailError) setEmailError("");
        break;
      case "name":
        if (nameError) setNameError("");
        break;
    }
  };

  const handleRedirect = (): void => {
    navigator("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.value) return;
    const isValid = validate(e.target.name, e.target.value);

    switch (e.target.name) {
      case "name":
        if (!isValid.success) return setNameError(isValid.error.errors[0].message) ;
        return setName(e.target.value);
      case "email":
        if (!isValid.success) return setEmailError(isValid.error.errors[0].message);
        return setEmail(e.target.value);
      case "password":
        if (!isValid.success) return setPasswordError(isValid.error.errors[0].message);
        return setPassword(e.target.value);
    }
    resetError(e.target.name);
  };

  const handleSubmit = () => {
    if (!name || !email || !password) return;
    setShowLoader(true);
    //logica de register
    setTimeout(() => setShowLoader(false), 5000);
  };

  return (
    <div key={"random"}>
      <main>
        <div className="wrapper">
          <span id="first">
            Tiny<span id="other">Reminder</span>
          </span>
          <div className="inputs">
            <input
              type="text"
              placeholder="Nome"
              autoComplete="name"
              name="name"
              onChange={handleChange}
              onMouseUp={() => resetError("name")}
            />
            <span className="error-text">{nameError}</span>
            <input
              type="email"
              placeholder="E-mail"
              autoComplete="email"
              name="email"
              onChange={handleChange}
              onMouseUp={() => resetError("email")}
            />
            <span className="error-text">{emailError}</span>
            <input
              type="password"
              placeholder="Senha"
              onChange={handleChange}
              name="password"
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
            Já possui uma conta?
          </span>
        </div>
      </main>
    </div>
  );
}

export default Register;