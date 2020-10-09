import React, { FC } from 'react';

const TotalOfCharacters: FC<{
  collection: any[];
}> = props => (
  <span style={{ color: 'cyan', margin: '0 1rem' }}>
    {props.collection?.length}
  </span>
);

export default TotalOfCharacters;
