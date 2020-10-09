import React, { FC } from 'react';
import { Box } from '@material-ui/core';

const TitleBar: FC<{
  title: string;
}> = props => (
  <Box mb={5}>
    <h1>{props.title}</h1>
  </Box>
);

export default TitleBar;
