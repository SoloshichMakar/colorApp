import React from "react";

interface IRegistrationProps {
  email: string;
  password: string;
  confirmPassword: string;
  message: string;
  error: Function;
  textEmailChange: Function;
  textPasswordChange: Function;
  textPasswordConfirmChange: Function;
  createUser: Function;
}

const Registration: React.FC<IRegistrationProps> = ({
  email,
  password,
  confirmPassword,
  message,
  createUser,
  error,
  textEmailChange,
  textPasswordChange,
  textPasswordConfirmChange,
}) => {
  function currentTextEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    const getTextAreaValue = e.target.value;
    textEmailChange(getTextAreaValue);
  }

  function currentTextPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    const getTextAreaValue = e.target.value;
    textPasswordChange(getTextAreaValue);
  }

  function currentTextConfirmPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    const getTextAreaValue = e.target.value;
    textPasswordConfirmChange(getTextAreaValue);
  }

  function createNewUser() {
    if (password === confirmPassword) {
      createUser(email, password);
    } else {
      error("Password and confirm password does not match");
    }
  }

  return (
    <div>
      <div>Registration Page</div>
      <div>
        <div id="message">{message}</div>
        <div>
          <div>Email</div>
          <input type="text" id="email" name="email" value={email} onChange={currentTextEmailChange} />
        </div>
        <div>
          <div>Password</div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={currentTextPasswordChange}
          />
          <div>Confirm Password</div>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={currentTextConfirmPasswordChange}
          />
        </div>
      </div>
      <input type="button" value="addUser" onClick={createNewUser} />
    </div>
  );
};

export default Registration;
