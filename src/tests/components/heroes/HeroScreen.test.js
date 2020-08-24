import React from 'react';
import {mount} from 'enzyme';
import {MemoryRouter, Route} from 'react-router-dom';
import HeroScreen from '../../../components/heroes/HeroScreen';

describe('Tests for <HeroScreen />', () => {
  test('Should display <Redirect /> if there are no arguments in the URL', () => {
    const history = {
      length: 10,
      goBack: jest.fn(),
      push: jest.fn()
    };
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero']}>
        <HeroScreen history={history} />
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Redirect').exists()).toBe(true);
  });

  test('Should display a hero if the argument exists', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
        <Route path="/hero/:heroId" component={HeroScreen} />
      </MemoryRouter>
    );
    expect(wrapper.find('.row').exists()).toBe(true);
  });

  test('Should return to default screen via push function', () => {
    const history = {
      length: 1,
      goBack: jest.fn(),
      push: jest.fn()
    };
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
        <Route
          path="/hero/:heroId"
          component={(props) => <HeroScreen history={history} />}
        />
      </MemoryRouter>
    );
    wrapper.find('button').prop('onClick')();
    expect(history.push).toHaveBeenCalledWith('/');
    expect(history.goBack).not.toHaveBeenCalled();
  });

  test('Should return to previous screen via goBack function', () => {
    const history = {
      length: 10,
      goBack: jest.fn(),
      push: jest.fn()
    };
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
        <Route
          path="/hero/:heroId"
          component={(props) => <HeroScreen history={history} />}
        />
      </MemoryRouter>
    );
    wrapper.find('button').prop('onClick')();
    expect(history.push).not.toHaveBeenCalled();
    expect(history.goBack).toHaveBeenCalled();
  });

  test('Should call redirect if the hero does not exist', () => {
    const history = {
      length: 10,
      goBack: jest.fn(),
      push: jest.fn()
    };
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider-wrong']}>
        <Route
          path="/hero/:heroId"
          component={(props) => <HeroScreen history={history} />}
        />
      </MemoryRouter>
    );
    expect(wrapper.text()).toBe('');
  });
});
