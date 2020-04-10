import Registration from "../../components/userRegistration/Registration"
import {connect} from "react-redux";
import {
    actionCreateUser,
    actionPasswordChange,
    actionEmailChange,
    actionPasswordConfirmChange,
    actionErrorMessage,
    actionUserIsCreateRiderect
} from '../../actions/RegistartionAction';
import {IStateRegistration} from "../types/types";


function mapStateToProps(state: any) {
    return {
        email: state.RegistrationReducer.email,
        password: state.RegistrationReducer.password,
        confirmPassword: state.RegistrationReducer.confirmPassword,
        message: state.RegistrationReducer.message,
        isCreated: state.RegistrationReducer.isCreated
    }
}

function mapDispatchToProps(dispatch: Function) {
    return {
        textEmailChange(email: string) {
            dispatch(actionEmailChange(email));
        },
        textPasswordChange(password: string) {
            dispatch(actionPasswordChange(password));
        },
        textPasswordConfirmChange(confirmPassword: string){
            dispatch(actionPasswordConfirmChange(confirmPassword));
        },
        createUser(email: string, password: string) {
            dispatch(actionCreateUser(email, password))
        },
        error(errorMessage: string) {
            dispatch(actionErrorMessage(errorMessage))
        },
        userIsCreate() {
            dispatch(actionUserIsCreateRiderect())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);