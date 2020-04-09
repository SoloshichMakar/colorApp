import {combineReducers} from "redux";
import toDoReducer from "./toDoReducer";
import UserAuthorisationReducer from "./UserAuthorisationReducer";
import RegistrationReducer from "./RegistrationReducer";

const MainReducer = combineReducers({
    toDoReducer,
    UserAuthorisationReducer,
    RegistrationReducer
});


export default MainReducer;