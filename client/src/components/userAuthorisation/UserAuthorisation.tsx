import React from "react";
import { Redirect, NavLink } from "react-router-dom";
import TasksContainer from "../taskContainer/TasksContainer";

interface IUserAuthorisationProps {
  email: string;
  password: string;
  isAuthenticated: boolean;
  message: string;
  textEmailChange: Function;
  textPasswordChange: Function;
  userValidate: Function;
}

const UserAuthorisation: React.FC<IUserAuthorisationProps> = ({
  email,
  password,
  isAuthenticated,
  message,
  textEmailChange,
  textPasswordChange,
  userValidate,
}) => {
  function currentTextEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    const getTextAreaValue = e.target.value;
    textEmailChange(getTextAreaValue);
  }

  function currentTextPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    const getTextAreaValue = e.target.value;
    textPasswordChange(getTextAreaValue);
  }

  function UserAuthorisationCheck() {
    userValidate(email, password);
  }

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div className="login_main">
      <div>Log in Page</div>
      <div className="login_main__data">
        <div className="login_main__message_box">
          <div className="login_main__message_label">{message}</div>
        </div>
        <div className="login_main__email_box">
          <div className="login_main__email_label">Email</div>
          <input
            className="login_main__email_input"
            type="text"
            onChange={currentTextEmailChange}
          />
        </div>
        <div className="login_main__password_box">
          <div className="login_main__password_label">Password</div>
          <input className="login_main__password_input" type="password" onChange={currentTextPasswordChange} />
        </div>
      </div>
      <input className="login_main__login_button" type="button" value="Log in" onClick={UserAuthorisationCheck} />
      <NavLink className="login_main__registration_link" to="/registration">Sign in</NavLink>
    </div>
  );
};

export default UserAuthorisation;
