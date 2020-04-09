import UserAuthorisation from "../../components/userAuthorisation/UserAuthorisation"
import {connect} from "react-redux";
import {actionEmailChange, actionPasswordChange, actionUserCheck} from '../../actions/UserAuthorisationActions';


function mapStateToProps(state: any) {
    return {
        email: state.UserAuthorisationReducer.email,
        password: state.UserAuthorisationReducer.password,
        isAuthenticated: state.UserAuthorisationReducer.isAuthenticated,
        message: state.UserAuthorisationReducer.message
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
        userValidate(email: string, password: string){
            dispatch(actionUserCheck(email, password));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAuthorisation);