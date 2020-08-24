import React from 'react';
import {mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import PrivateRoute from '../../routers/PrivateRoute';

describe('Tests for <PrivateRoute />', () => {
  let props;

  beforeEach(() => {
    props = {
      location: {
        pathname: '/marvel'
      }
    };
    Storage.prototype.setItem = jest.fn();
  });

  test('Should show the component if the user is authenticated', () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={true}
          component={() => <span>Ready!</span>}
          {...props}
        />
      </MemoryRouter>
    );
    expect(wrapper.find('span').exists()).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', props.location.pathname);
  });

  test('Should block the component if the user is not authenticated', () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={false}
          component={() => <span>Ready!</span>}
          {...props}
        />
      </MemoryRouter>
    );
    expect(wrapper.find('span').exists()).toBe(false);
    expect(wrapper.html()).toBe('');
    expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', props.location.pathname);
  });
});
