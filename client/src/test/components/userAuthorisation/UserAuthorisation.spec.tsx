import React from 'react';
import renderer from 'react-test-renderer';

import UserAuthorisation from '../../../components/userAuthorisation/UserAuthorisation';
import {BrowserRouter} from "react-router-dom";


const props = {
    isAuthenticated: false,
    message: 'Test Messsage',
    email: 'Test@mail.com',
    password: 'Test Password',
    textEmailChange: Function,
    textPasswordChange: Function,
    userValidate: Function,
};


it('renders correctly', () => {
    const tree = renderer
        .create(
            <BrowserRouter>
                <UserAuthorisation
                    isAuthenticated={props.isAuthenticated}
                    message={props.message}
                    email={props.email}
                    password={props.password}
                    textEmailChange={props.textEmailChange}
                    textPasswordChange = {props.textPasswordChange}
                    userValidate={props.userValidate}/>
            </BrowserRouter>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});