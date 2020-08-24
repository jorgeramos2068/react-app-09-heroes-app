import React from 'react';
import {mount} from 'enzyme';
import {MemoryRouter, Router} from 'react-router-dom';
import Navbar from '../../../components/ui/Navbar';
import AuthContext from '../../../auth/AuthContext';
import types from '../../../types/types';

describe('Tests for <Navbar />', () => {
  let wrapper;
  let contextValue;
  const historyMock = {
    push: jest.fn(),
    replace: jest.fn(),
    location: {},
    listen: jest.fn(),
    createHref: jest.fn()
  };

  beforeEach(() => {
    contextValue = {
      dispatch: jest.fn(),
      user: {
        name: 'Batman',
        logged: true
      }
    };
    wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Router history={historyMock}>
            <Navbar />
          </Router>
        </MemoryRouter>
      </AuthContext.Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should display <Navbar /> correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.text-info').text().trim()).toBe(contextValue.user.name);
  });

  test('Should call logout function and use history object', () => {
    wrapper.find('button').prop('onClick')();
    expect(contextValue.dispatch).toHaveBeenCalledWith({
      type: types.logout
    });
    expect(historyMock.replace).toHaveBeenCalledWith('/login');
  });
});
