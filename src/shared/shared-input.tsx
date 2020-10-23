import React, { FC } from 'react';
import { Field, useFormikContext } from 'formik';
import { Box, createStyles, TextField, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const SharedInput: FC<{
  id: string;
}> = ({ id }) => {
  const classes = useStyles();
  const formik = useFormikContext<any>();

  return (
    <Box mb={2}>
      <Field
        className={classes.field}
        type={'text'}
        label={id.toUpperCase()}
        name={id}
        as={TextField}
        error={formik.touched[id] && formik.errors[id]}
        helperText={formik.touched[id] && formik.errors[id]}
      />
    </Box>
  );
};

export default SharedInput;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    field: {
      marginBottom: '2rem',
      width: '100%',
    },
  }),
);
