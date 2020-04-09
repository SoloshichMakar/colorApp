import {IState, ITask} from "../types/types";
import {actionTaskIsCompleted} from "../../actions/actions";
import {connect} from "react-redux";
import Task from "../../components/task/Task";

function mapStateToProps(state: IState, ownProps:ITask) {
    return {
        taskText: ownProps.taskText,
        id: ownProps.id,
        taskColor: ownProps.taskColor,
        completed: ownProps.completed
    };
}

function mapDispatchToProps(dispatch: Function) {
    return {
        taskIsCompleted(completedTaskId: string, completed: boolean) {
            dispatch(actionTaskIsCompleted(completedTaskId, completed));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);