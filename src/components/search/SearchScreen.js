import React, {useMemo} from 'react';
import queryString from 'query-string';
import {useLocation} from 'react-router-dom';
import HeroCard from '../heroes/HeroCard';
import useForm from '../../hooks/useForm';
import getHeroesByName from '../../selectors/getHeroesByName';

const SearchScreen = ({history}) => {
  const location = useLocation();
  const {q = ''} = queryString.parse(location.search);

  const [formValues, handleInputChange] = useForm({
    searchText: q
  });

  const {searchText} = formValues;

  const filteredHeroes = useMemo(() => getHeroesByName(q), [q]);

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`?q=${searchText}`);
  };

  return (
    <div>
      <h1>Search Screen</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Search Form</h4>
          <hr />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="searchText"
              placeholder="Find your hero"
              className="form-control"
              autoComplete="off"
              value={searchText}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="btn m-1 btn-block btn-outline-primary"
            >
              Search
            </button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />
          {
            (q === '') && <div className="alert alert-info">Search a hero</div>
          }
          {
            (q !== '' && filteredHeroes.length === 0) && <div className="alert alert-danger">String {q} not found</div>
          }
          {
            filteredHeroes.map(hero => (
              <HeroCard
                key={hero.id}
                {...hero}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default SearchScreen;
