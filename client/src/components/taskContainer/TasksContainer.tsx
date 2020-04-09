import React, { useEffect } from "react";

import {
  MainContainer,
  DeleteButton,
  Menu,
  MenuAddButton,
  MenuChooseColors,
  MenuInputTaskText,
  TaskList,
  TaskListWithDelete,
} from "./style";
import { IState, ITask } from "../../store/types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { COLORS } from "../../utils/Constants";
import ChooseColorConnector from "../../store/connectors/ChooseColorConnector";
import TaskConnector from "../../store/connectors/TaskConnector";
import { Redirect } from "react-router-dom";

function getRandomInt(maxNumber: number): number {
  return Math.floor(Math.random() * Math.floor(maxNumber));
}

interface ITaskContainerProps extends IState {
  addTask: Function;
  textChange: Function;
  deleteTask: Function;
  getData: Function;
  isAuthenticated: boolean;
  userId: number;
}

const TasksContainer: React.FC<ITaskContainerProps> = ({
  tasks,
  inputText,
  chosenColor,
  addTask,
  textChange,
  deleteTask,
  getData,
  isAuthenticated,
  userId,
}) => {
  const enterKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      addNewTask();
    }
  };

  const addNewTask = () => {
    if (inputText.length > 0) {
      const newTask: ITask = {
        id: "",
        taskText: inputText,
        taskColor:
          chosenColor === ""
            ? COLORS[getRandomInt(COLORS.length)]
            : chosenColor,
        completed: false,
      };
      addTask(newTask, userId);
    }
  };

  const currentTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const getTextAreaValue: string = e.target.value;
    textChange(getTextAreaValue);
  };

  const deleteCurrentTask = (deleteId: string) => {
    deleteTask(deleteId);
  };

  function handleGetData() {
    getData(userId);
  }

  useEffect(handleGetData, []);

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return (
    <MainContainer id="mainContainer">
      <TaskList>
        {tasks.map((task: ITask) => (
          <TaskListWithDelete>
            <TaskConnector
              key={`${task.id}`}
              taskText={task.taskText}
              taskColor={task.taskColor}
              completed={task.completed}
              id={task.id}
            />
            <DeleteButton
              className="fas fa-trash"
              onClick={() => deleteCurrentTask(task.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </DeleteButton>
          </TaskListWithDelete>
        ))}
      </TaskList>
      <Menu>
        <MenuInputTaskText
          type="text"
          value={inputText}
          onKeyPress={enterKeyPress}
          onChange={currentTextChange}
          placeholder="Add New Item"
        />
        <MenuChooseColors>
          <ChooseColorConnector />
          <MenuAddButton className="menu__add-button" onClick={addNewTask}>
            add
          </MenuAddButton>
        </MenuChooseColors>
      </Menu>
    </MainContainer>
  );
};
export default TasksContainer;
