import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AntiHeroForm from '../components/AntiHeroForm';
import { RootState } from '../../../store/reducers';
import TitleBar from '../../../shared/title-bar';
import UpdateUiLabel from '../../../shared/update-ui-label';
import { removeAntiHeroByIdTemporaryAction } from '../anti-hero.slice';
import {
  deleteAntiHeroByIdAction,
  getAntiHeroesAction,
} from '../anti-hero.async.actions';
import {
  Box,
  Button,
  createStyles,
  Theme,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const AntiHeroes: FC = () => {
  const dispatch = useDispatch();
  const { loading, antiHeroes } = useSelector(
    (state: RootState) => state.antiHero,
  );

  const smallScreen = useMediaQuery('(max-width:600px)');
  const classes = useStyles();

  /*local state*/
  const [counter, setCounter] = useState('0');

  useEffect(() => {
    dispatch(getAntiHeroesAction());
  }, [dispatch]);

  return (
    <div>
      <TitleBar title={'Anti Heroes'} />
      <AntiHeroForm />
      <UpdateUiLabel />
      <>
        {loading ? (
          <h2>Loading.. Please wait..</h2>
        ) : (
          antiHeroes.map(ah => (
            <Box
              mb={2}
              key={ah.id}
              display={'flex'}
              flexDirection={smallScreen ? 'column' : 'row'}
              justifyContent={'space-between'}
            >
              <div>
                <Typography>
                  <span>{`${ah.firstName} ${ah.lastName} is ${ah.knownAs}`}</span>
                  {counter === ah.id && <span> - marked</span>}
                </Typography>
              </div>
              <div>
                <Button
                  className={classes.button}
                  onClick={() => setCounter(ah.id)}
                  variant={'contained'}
                  color={'default'}
                >
                  Mark
                </Button>{' '}
                <Button
                  className={classes.button}
                  onClick={() =>
                    dispatch(removeAntiHeroByIdTemporaryAction(ah.id))
                  }
                  variant={'contained'}
                  color={'secondary'}
                >
                  Remove
                </Button>{' '}
                <Button
                  className={classes.button}
                  onClick={() => dispatch(deleteAntiHeroByIdAction(ah.id))}
                  variant={'outlined'}
                  color={'secondary'}
                >
                  DELETE in DB
                </Button>
              </div>
            </Box>
          ))
        )}
      </>
      {antiHeroes.length === 0 && !loading && (
        <Button
          className={classes.button}
          variant={'contained'}
          color={'primary'}
          onClick={() => dispatch(getAntiHeroesAction())}
        >
          Re-fetch
        </Button>
      )}
    </div>
  );
};

export default AntiHeroes;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: '0 0.5rem',
      '&:focus': {
        outline: 'none',
      },
    },
  }),
);
