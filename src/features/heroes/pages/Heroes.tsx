import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeroForm from '../components/HeroForm';
import TitleBar from '../../../shared/title-bar';
import UpdateUiLabel from '../../../shared/update-ui-label';
import { deleteHeroByIdAction, getHeroesAction } from '../hero.async.actions';
import { removeHeroByIdTemporaryAction } from '../hero.slice';
import { RootState } from '../../../store/reducers';
import {
  Box,
  Button,
  createStyles,
  Theme,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const Heroes: FC = () => {
  const dispatch = useDispatch();
  const { heroes, loading } = useSelector((state: RootState) => state.hero);

  const smallScreen = useMediaQuery('(max-width:600px)');
  const classes = useStyles();

  /*local state*/
  const [counter, setCounter] = useState('0');

  useEffect(() => {
    dispatch(getHeroesAction());
  }, []);

  return (
    <div>
      <TitleBar title={'Super Heroes'} />
      <HeroForm />
      <UpdateUiLabel />
      <>
        {loading ? (
          <h2>Loading.. Please wait..</h2>
        ) : (
          heroes.map(h => (
            <Box
              key={h.id}
              mb={2}
              display={'flex'}
              flexDirection={smallScreen ? 'column' : 'row'}
              justifyContent={'space-between'}
            >
              <Typography>
                <span>{`${h.firstName} ${h.lastName} is ${h.knownAs}`}</span>
                {counter === h.id && <span> - marked</span>}
              </Typography>
              <div>
                <Button
                  className={classes.button}
                  onClick={() => setCounter(h.id)}
                  variant={'contained'}
                  color={'default'}
                >
                  Mark
                </Button>{' '}
                <Button
                  className={classes.button}
                  onClick={() => dispatch(removeHeroByIdTemporaryAction(h.id))}
                  variant={'contained'}
                  color={'secondary'}
                >
                  Remove
                </Button>{' '}
                <Button
                  className={classes.button}
                  onClick={() => dispatch(deleteHeroByIdAction(h.id))}
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
      {heroes.length === 0 && !loading && (
        <Button
          className={classes.button}
          variant={'contained'}
          color={'primary'}
          onClick={() => dispatch(getHeroesAction())}
        >
          Re-fetch
        </Button>
      )}
    </div>
  );
};

export default Heroes;

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
