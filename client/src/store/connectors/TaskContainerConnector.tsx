import { ITask, IState } from "../types/types";
import TasksContainer from "../../components/taskContainer/TasksContainer";
import { connect } from "react-redux";
import {
  actionAddTask,
  actionDeleteTask,
  actionTextChange,
  actionGetData,
} from "../../actions/actions";

function mapStateToProps(state: any) {
  return {
    tasks: state.toDoReducer.tasks,
    inputText: state.toDoReducer.inputText,
    chosenColor: state.toDoReducer.chosenColor,
    isAuthenticated: state.UserAuthorisationReducer.isAuthenticated,
    userId: state.UserAuthorisationReducer.userId
  };
}

function mapDispatchToProps(dispatch: Function) {
  return {
    addTask(newTask: ITask, userId: number) {
      dispatch(actionAddTask(newTask, userId));
    },
    textChange(getTextAreaValue: string) {
      dispatch(actionTextChange(getTextAreaValue));
    },
    deleteTask(deleteId: string) {
      dispatch(actionDeleteTask(deleteId));
    },
    getData(userId: number) {
      dispatch(actionGetData(userId))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksContainer);
