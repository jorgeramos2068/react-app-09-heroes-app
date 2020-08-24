import React from 'react';
import {mount} from 'enzyme';
import LoginScreen from '../../../components/login/LoginScreen';
import AuthContext from '../../../auth/AuthContext';
import types from '../../../types/types';

describe('Tests for <LoginScreen />', () => {
  let wrapper;
  let contextValue;
  const historyMock = {
    push: jest.fn()
  };

  beforeEach(() => {
    contextValue = {
      dispatch: jest.fn()
    };
    wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <LoginScreen history={historyMock} />
      </AuthContext.Provider>
    );
  });

  test('Should display <LoginScreen /> correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Should perform dispatch and navegation', () => {
    const handleClick = wrapper.find('button').prop('onClick');
    handleClick();
    expect(contextValue.dispatch).toHaveBeenCalledWith({
      type: types.login,
      payload: {
        name: 'Batman'
      }
    });
    expect(historyMock.push).toHaveBeenCalledWith('/');
  });
});
