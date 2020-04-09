import {
    actionCreateUser,
    actionPasswordChange,
    actionEmailChange,
    actionPasswordConfirmChange,
    actionErrorMessage
} from '../../actions/RegistartionAction';

import {
    ASYNC_CREATE_USER, ERROR,
    TEXT_CONFIRM_PASSWORD_CHANGE,
    TEXT_EMAIL_CHANGE,
    TEXT_PASSWORD_CHANGE
} from "../../utils/Constants";
import {email, password} from '../testUtils/utilsConstant'


describe('test Registration actions', () => {
    it('should make action create user', () => {
        const result = actionCreateUser(email, password);
        expect(result).toEqual({type:ASYNC_CREATE_USER, email, password});
    });

    it('should make action email change', function () {
        const result = actionEmailChange(email);
        expect(result).toEqual({type:TEXT_EMAIL_CHANGE, email});
    });

    it('should make action password change', function () {
        const result = actionPasswordChange(password);
        expect(result).toEqual({type:TEXT_PASSWORD_CHANGE, password});
    });

    it('should make action password confirm change', function () {
        const result = actionPasswordConfirmChange(password);
        expect(result).toEqual({type:TEXT_CONFIRM_PASSWORD_CHANGE, confirmPassword:password});
    });

    it('should make action error message', function () {
        const testMessage = 'Test error message';
        const result = actionErrorMessage(testMessage);
        expect(result).toEqual({type:ERROR, errorMessage:testMessage});
    });
});