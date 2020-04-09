import {
    actionSetColor,
} from "../../actions/actions";
import {connect} from "react-redux";
import ChooseColor from "../../components/chooseColor/ChooseColor";

function mapDispatchToProps(dispatch: Function) {
    return {
        setColor(value: string) {
            dispatch(actionSetColor(value));
        }
    };
}

export default connect(null, mapDispatchToProps)(ChooseColor);
