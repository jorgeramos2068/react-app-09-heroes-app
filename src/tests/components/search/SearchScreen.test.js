import React from 'react';
import {mount} from 'enzyme';
import {MemoryRouter, Route} from 'react-router-dom';
import SearchScreen from '../../../components/search/SearchScreen';

describe('Tests in <SearchScreen />', () => {
  test('Should display <SearchScreen /> correctly with default values', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search']}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.alert-info').text().trim()).toBe('Search a hero');
  });

  test('Should show a search with the value in the input', () => {
    const query = 'batman';
    const wrapper = mount(
      <MemoryRouter initialEntries={[`/search?q=${query}`]}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );
    expect(wrapper.find('input').prop('value')).toBe(query);
  });

  test('Should show an error if no hero was found', () => {
    const query = 'batman-wrong';
    const wrapper = mount(
      <MemoryRouter initialEntries={[`/search?q=${query}`]}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );
    expect(wrapper.find('input').prop('value')).toBe(query);
    expect(wrapper.find('.alert.alert-danger').exists()).toBe(true);
    expect(wrapper.find('.alert.alert-danger').text().trim()).toBe(`String ${query} not found`);
  });

  test('Should call push from history', () => {
    const history = {
      push: jest.fn()
    };
    const query = 'batman';
    const wrapper = mount(
      <MemoryRouter initialEntries={[`/search?q=${query}`]}>
        <Route
          path="/search"
          component={() => <SearchScreen history={history} />}
        />
      </MemoryRouter>
    );
    wrapper.find('input').simulate('change', {
      target: {
        name: 'searchText',
        value: query
      }
    });
    wrapper.find('form').prop('onSubmit')({
      preventDefault(){}
    });
    expect(history.push).toHaveBeenCalledWith(`?q=${query}`);
  });
});
