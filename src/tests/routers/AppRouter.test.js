import React from 'react';
import {mount} from 'enzyme';
import AppRouter from '../../routers/AppRouter';
import AuthContext from '../../auth/AuthContext';

describe('Tests for <AppRouter /', () => {
  test('Should show login page if the user is not authenticated', () => {
    const contextValue = {
      dispatch: jest.fn(),
      user: {
        logged: false
      }
    };
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.html().includes('Login')).toBe(true);
  });

  test('Should show Marvel component if the user is authenticated', () => {
    const contextValue = {
      dispatch: jest.fn(),
      user: {
        name: 'Batman',
        logged: true
      }
    };
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.navbar').exists()).toBe(true);
  });
});
