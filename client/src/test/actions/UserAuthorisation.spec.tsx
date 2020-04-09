import {actionEmailChange, actionPasswordChange, actionUserCheck} from '../../actions/UserAuthorisationActions';
import {email, password} from "../testUtils/utilsConstant";
import {TEXT_EMAIL_CHANGE, TEXT_PASSWORD_CHANGE, ASYNC_USER_CHECK} from "../../utils/Constants";

describe('test User Authorisation actions', () => {
    it('should make action email change', () => {
        const result = actionEmailChange(email);
        expect(result).toEqual({type:TEXT_EMAIL_CHANGE, email});
    });

    it('should make action password change', function () {
        const result = actionPasswordChange(password);
        expect(result).toEqual({type:TEXT_PASSWORD_CHANGE, password});
    });
    it('should make action user check', function () {
        const result = actionUserCheck(email, password);
        expect(result).toEqual({type:ASYNC_USER_CHECK, email, password});
    });
});