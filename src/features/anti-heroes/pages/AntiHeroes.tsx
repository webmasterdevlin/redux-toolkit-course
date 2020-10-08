import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import AntiHeroForm from '../components/AntiHeroForm';
import { RootState } from '../../../store/reducers';
import TitleBar from '../../../shared/title-bar';
import UpdateUiLabel from '../../../shared/update-ui-label';
import { removeAntiHeroByIdTemporaryAction } from '../anti-hero.slice';
import {
  deleteAntiHeroByIdAction,
  getAntiHeroesAction,
} from '../anti-hero.async.actions';

type Props = {};

const AntiHeroes: React.FC<Props> = () => {
  const dispatch = useDispatch();

  const { loading, antiHeroes } = useSelector(
    (state: RootState) => state.antiHero,
  );

  const [counter, setCounter] = useState('0');

  useEffect(() => {
    dispatch(getAntiHeroesAction());
  }, [dispatch]);

  return (
    <div>
      <TitleBar title={'Anti Heroes'} />
      <AntiHeroForm />
      <UpdateUiLabel />
      <ul className={'list-group'}>
        {loading ? (
          <h2>Loading.. Please wait..</h2>
        ) : (
          antiHeroes.map(ah => (
            <li
              key={ah.id}
              className={
                'list-group-item col-12 d-flex justify-content-between'
              }
            >
              <div>
                <span>{`${ah.firstName} ${ah.lastName} is ${ah.knownAs}`}</span>
                {counter === ah.id && <span> - marked</span>}
              </div>
              <div>
                <Button onClick={() => setCounter(ah.id)} variant="dark">
                  Mark
                </Button>{' '}
                <Button
                  onClick={() =>
                    dispatch(removeAntiHeroByIdTemporaryAction(ah.id))
                  }
                  variant="outline-danger"
                >
                  Remove
                </Button>{' '}
                <Button
                  onClick={() => dispatch(deleteAntiHeroByIdAction(ah.id))}
                  variant="danger"
                >
                  DELETE in DB
                </Button>
              </div>
            </li>
          ))
        )}
      </ul>
      {antiHeroes.length === 0 && !loading && (
        <Button
          variant={'info'}
          onClick={() => dispatch(getAntiHeroesAction())}
        >
          Re-fetch
        </Button>
      )}
    </div>
  );
};

export default AntiHeroes;
