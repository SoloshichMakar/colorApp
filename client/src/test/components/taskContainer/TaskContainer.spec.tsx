import React from "react";
import renderer from "react-test-renderer";
import { COLORS } from "../../../utils/Constants";

import TasksContainer from "../../../components/taskContainer/TasksContainer";
import { BrowserRouter } from "react-router-dom";
import { ITask } from "../../../store/types/types";
import createSagaMiddleware from "redux-saga";
import { applyMiddleware, createStore } from "redux";
import MainReducer from "../../../store/reducers/MainReducer";
import rootSaga from "../../../store/saga/rootSaga";
import { Provider } from "react-redux";

const tasks: Array<ITask> = [
  {
    taskColor: COLORS[0],
    taskText: "Test text 1",
    id: "1",
    completed: true,
  },
  {
    taskColor: COLORS[1],
    taskText: "Test text 2",
    id: "2",
    completed: false,
  },
];

const props = {
  tasks: tasks,
  inputText: " Test text",
  chosenColor: COLORS[0],
  isAuthenticated: true,
  userId: 1,
  addTask: Function,
  textChange: Function,
  deleteTask: Function,
  getData: Function,
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(MainReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

it("renders correctly", () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <BrowserRouter>
          <TasksContainer
            tasks={props.tasks}
            inputText={props.inputText}
            chosenColor={props.chosenColor}
            isAuthenticated={props.isAuthenticated}
            userId={props.userId}
            addTask={props.addTask}
            textChange={props.textChange}
            deleteTask={props.deleteTask}
            getData={props.getData}
          />
        </BrowserRouter>
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
