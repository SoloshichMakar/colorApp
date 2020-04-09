import React from 'react';
import renderer from 'react-test-renderer';
import { COLORS } from "../../../utils/Constants";

import Task from '../../../components/task/Task';
import {BrowserRouter} from "react-router-dom";


const props = {
    taskText: 'Test Text',
    id: '1',
    taskColor: COLORS[0],
    completed: false,
    taskIsCompleted: Function
};


it('renders correctly', () => {
    const tree = renderer
        .create(
            <BrowserRouter>
                <Task
                    taskText={props.taskText}
                    id={props.id}
                    taskColor={props.taskColor}
                    completed={props.completed}
                    taskIsCompleted={props.taskIsCompleted}
                />
    </BrowserRouter>
)
.toJSON();
    expect(tree).toMatchSnapshot();
});