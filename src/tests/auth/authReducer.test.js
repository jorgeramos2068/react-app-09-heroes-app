import authReducer from '../../auth/authReducer';
import types from '../../types/types';

describe('Tests in authReducer', () => {
  test('Should return default value', () => {
    const initialState = {
      logged: false
    };
    const state = authReducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test('Should authenticate user', () => {
    const initialState = {
      logged: false
    };
    const user = {
      name: 'Batman'
    };
    const action = {
      type: types.login,
      payload: user
    };
    const state = authReducer(initialState, action);
    expect(state).toEqual({
      ...action.payload,
      logged: true
    });
  });

  test('Should delete user name and set logged in false', () => {
    const initialState = {
      name: 'Batman',
      logged: true
    };
    const action = {
      type: types.logout
    };
    const state = authReducer(initialState, action);
    expect(state).toEqual({
      logged: false
    });
  });
});
