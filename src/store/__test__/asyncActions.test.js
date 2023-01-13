import { authLogin, authLoginFailure, authLoginRequest, authLoginSucces } from '../actions.js'

describe('authLogin', () => {
    const credentials = 'credentials';
    const action = authLogin(credentials);
    const dispatch = jest.fn();
    const api = {auth: {}};
    const router = {navigate: jest.fn()};
    const url = '/'
    describe('When login api resolves', () => {
        test('Should follow the login flow', async () => {
            api.auth.login = jest.fn().mockResolvedValue('token');
            const accesToken = await action(dispatch, undefined, {api, router});
            expect(dispatch).toHaveBeenNthCalledWith(1, authLoginRequest());
            expect(api.auth.login).toBeCalledWith(credentials);
            expect(accesToken).toBe('token');
            expect(dispatch).toHaveBeenNthCalledWith(2, authLoginSucces());
            expect(router.navigate).toHaveBeenCalledWith(url);
        });
        
    });
    describe('When login api rejects', () => {
        const error = new Error('error');
        test('Should follow the error flow', async () => {
            api.auth.login = jest.fn().mockRejectedValue(error);
            const promise = action(dispatch, undefined, {api, router});
            await expect(promise).rejects.toThrow(error)
            expect(dispatch).toHaveBeenNthCalledWith(1, authLoginRequest());
            expect(dispatch).toHaveBeenNthCalledWith(2, authLoginFailure(error));
        });

    });
});