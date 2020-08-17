import React, {useMemo} from 'react';
import {useParams, Redirect} from 'react-router-dom';
import getHeroById from '../../selectors/getHeroById';

const HeroScreen = ({history}) => {
  const {heroId} = useParams();
  const hero = useMemo(() => getHeroById(heroId), [heroId]);
  if (!hero) {
    return <Redirect to="/" />
  }
  const {
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters
  } = hero;

  const handleReturn = () => {
    if (history.length <= 2) {
      history.push('/');
    }
    else {
      history.goBack();
    }
  };

  return (
    <div className="row mt-5">
      <div className="col-4">
        <img
          src={`../assets/heroes/${heroId}.jpg`}
          className="img-thumbnail  animate__animated animate__fadeInLeft"
          alt={superhero}
        />
      </div>
      <div className="col-8">
        <h3>{superhero}</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <strong>Alter ego:</strong> {alter_ego}
          </li>
          <li className="list-group-item">
            <strong>Publisher:</strong> {publisher}
          </li>
          <li className="list-group-item">
            <strong>First appearance:</strong> {first_appearance}
          </li>
        </ul>
        <h5>Characters:</h5>
        <p>{characters}</p>
        <button
          className="btn btn-outline-info"
          onClick={handleReturn}
        >
          Return
        </button>
      </div>
    </div>
  );
};

export default HeroScreen;
