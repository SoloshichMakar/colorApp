import React from 'react';
import renderer from 'react-test-renderer';

import ChooseColor from '../../../components/chooseColor/ChooseColor';
import {BrowserRouter} from "react-router-dom";


const props = {
    setColor: Function
};


it('renders correctly', () => {
    const tree = renderer
        .create(
            <BrowserRouter>
                <ChooseColor
                 setColor={props.setColor}
                />
            </BrowserRouter>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});