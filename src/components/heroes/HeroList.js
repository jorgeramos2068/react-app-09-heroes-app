import React, {useMemo} from 'react';
import HeroCard from './HeroCard';
import getHeroesByPublisher from '../../selectors/getHeroesByPublisher';

const HeroList = ({publisher}) => {
  const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]);

  return (
    <div className="card-columns animate__animated animate__fadeIn">
      {
        heroes.map(hero => (
          <HeroCard
            key={hero.id}
            {...hero}
          >
          </HeroCard>
        ))
      }
    </div>
  );
};

export default HeroList;
