import React from "react";
import { NavLink, Redirect } from "react-router-dom";

interface IRegistrationProps {
  email: string;
  password: string;
  confirmPassword: string;
  message: string;
  isCreated: boolean;
  userIsCreate:Function;
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
  isCreated,
  error,
  textEmailChange,
  textPasswordChange,
  textPasswordConfirmChange,
  userIsCreate,
}) => {
  function currentTextEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    const getTextAreaValue = e.target.value;
    textEmailChange(getTextAreaValue);
  }

  function currentTextPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    const getTextAreaValue = e.target.value;
    textPasswordChange(getTextAreaValue);
  }

  function currentTextConfirmPasswordChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const getTextAreaValue = e.target.value;
    textPasswordConfirmChange(getTextAreaValue);
  }

  function createNewUser() {
    if(password.length > 5) {
      if (password === confirmPassword) {
        createUser(email, password);
      } else {
        error("Password and confirm password does not match");
      }
    } else {
      error("Password must be at least six characters long");
    }
  }

  if (isCreated) {
    userIsCreate();
    error();
    return <Redirect to="/login" />;
  }

  return (
    <div className="registration_main">
      <div>Registration Page</div>
      <div className="registration_main__message_box">
        <div className="registration_main__message_label" id="message">
          {message}
        </div>
        <div className="registration_main__email_box">
          <div className="registration_main__email_label">Email</div>
          <input
            className="registration_main__email_input"
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={currentTextEmailChange}
          />
        </div>
        <div className="registration_main__password_box">
          <div className="registration_main__password_label">Password</div>
          <input
            className="registration_main__password_input"
            type="password"
            id="password"
            value={password}
            onChange={currentTextPasswordChange}
          />
          <div className="registration_main__confirm_password_box">
            <div className="registration_main__confirm_password_label">
              Confirm Password
            </div>
            <input
              className="registration_main__confirm_password_input"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={currentTextConfirmPasswordChange}
            />
          </div>
        </div>
      </div>
      <input
        className="registration_main__create_user_button"
        type="button"
        value="addUser"
        onClick={createNewUser}
      />
      <NavLink className="registration_main__back_link" to="/login">
        Back
      </NavLink>
    </div>
  );
};

export default Registration;
