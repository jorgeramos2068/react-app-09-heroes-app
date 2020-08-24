import React from 'react';
import {mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import DashboardRoutes from '../../routers/DashboardRoutes';
import AuthContext from '../../auth/AuthContext';

describe('Tests for <DashboardRoutes />', () => {
  let contextValue;

  beforeEach(() => {
    contextValue = {
      dispatch: jest.fn(),
      user: {
        name: 'Test',
        logged: true
      }
    };
  });

  test('Should display <DashboardRoutes /> correctly', () => {
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <DashboardRoutes />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.navbar').exists()).toBe(true);
    expect(wrapper.contains('MarvelScreen')).toBe(true);
  });
});
