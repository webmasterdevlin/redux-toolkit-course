import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VillainForm from '../components/VillainForm';
import TitleBar from '../../../shared/title-bar';
import UpdateUiLabel from '../../../shared/update-ui-label';
import {
  deleteVillainByIdAction,
  getVillainsAction,
} from '../villain.async.actions';
import { removeVillainByIdTemporaryAction } from '../villain.slice';
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

const Villains: FC = () => {
  const dispatch = useDispatch();
  const { villains, loading } = useSelector(
    (state: RootState) => state.villain,
  );

  const classes = useStyles();
  const smallScreen = useMediaQuery('(max-width:600px)');

  /*local state*/
  const [counter, setCounter] = useState('0');

  useEffect(() => {
    dispatch(getVillainsAction());
  }, []);

  return (
    <div>
      <TitleBar title={'Super Villains'} />
      <VillainForm />
      <UpdateUiLabel />
      <>
        {loading ? (
          <h2>Loading.. Please wait..</h2>
        ) : (
          villains.map(v => (
            <Box
              key={v.id}
              mb={2}
              display={'flex'}
              flexDirection={smallScreen ? 'column' : 'row'}
              justifyContent={'space-between'}
            >
              <Typography>
                <span>{`${v.firstName} ${v.lastName} is ${v.knownAs}`}</span>
                {counter === v.id && <span> - marked</span>}
              </Typography>
              <div>
                <Button
                  className={classes.button}
                  onClick={() => setCounter(v.id)}
                  variant={'contained'}
                  color={'default'}
                >
                  Mark
                </Button>{' '}
                <Button
                  className={classes.button}
                  onClick={() =>
                    dispatch(removeVillainByIdTemporaryAction(v.id))
                  }
                  variant={'contained'}
                  color={'secondary'}
                >
                  Remove
                </Button>{' '}
                <Button
                  className={classes.button}
                  onClick={() => dispatch(deleteVillainByIdAction(v.id))}
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
      {villains.length === 0 && !loading && (
        <Button
          className={classes.button}
          variant={'contained'}
          color={'primary'}
          onClick={() => dispatch(getVillainsAction())}
        >
          Re-fetch
        </Button>
      )}
    </div>
  );
};

export default Villains;

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
