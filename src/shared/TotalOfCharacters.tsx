import React from 'react';

type Props = {
  collection: any[];
};

const TotalOfCharacters: React.FC<Props> = ({ collection }) => (
  <span style={{ color: 'cyan', margin: '0 1rem' }}>{collection?.length}</span>
);

export default TotalOfCharacters;
