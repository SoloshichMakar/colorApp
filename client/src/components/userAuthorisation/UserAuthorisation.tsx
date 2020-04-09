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
    <div>
      <div>Log in Page</div>
      <div>
        <div>
          <div>{message}</div>
          <div>Email</div>
          <input type="text" onChange={currentTextEmailChange} />
        </div>
        <div>
          <div>Password</div>
          <input type="password" onChange={currentTextPasswordChange} />
        </div>
      </div>
      <input type="button" value="Log in" onClick={UserAuthorisationCheck} />
      <NavLink to="/registration">Sign in</NavLink>
    </div>
  );
};

export default UserAuthorisation;