import React from "react";

import { TaskList, TaskCheckbox, TaskText } from "./style";
import {ITask} from "../../store/types/types";

export interface ITaskProps extends ITask {
    taskIsCompleted: Function;
}

const  Task: React.FC<ITaskProps>  = ({ taskText, id, taskColor, completed, taskIsCompleted }) => {

  const currentTaskIsCompleted = (completedTaskId: string) => {
    taskIsCompleted(completedTaskId, !completed);
  };

  return (
    <TaskList style={{ backgroundColor: completed ? "lightgrey" : taskColor }}>
      <TaskCheckbox
        type="checkbox"
        onClick={() => currentTaskIsCompleted(id)}
        checked={completed}
      />
      <TaskText>{taskText}</TaskText>
    </TaskList>
  );
};
export default Task;
