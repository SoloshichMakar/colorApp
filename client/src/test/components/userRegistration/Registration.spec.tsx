import React from "react";
import renderer from "react-test-renderer";

import Registration from "../../../components/userRegistration/Registration";
import { BrowserRouter } from "react-router-dom";

const props = {
  message: "Test Messsage",
  email: "Test@mail.com",
  password: "Test Password",
  confirmPassword: "Test Password",
  error: Function,
  textEmailChange: Function,
  textPasswordChange: Function,
  textPasswordConfirmChange: Function,
  createUser: Function,
};

it("renders correctly", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Registration
          message={props.message}
          email={props.email}
          password={props.password}
          confirmPassword={props.confirmPassword}
          textEmailChange={props.textEmailChange}
          textPasswordChange={props.textPasswordChange}
          textPasswordConfirmChange={props.textPasswordConfirmChange}
          createUser={props.createUser}
          error={props.error}
        />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
