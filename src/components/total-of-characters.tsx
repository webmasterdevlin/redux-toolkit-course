import React from 'react';

type Props = {
  collection: any[];
};

const TotalOfCharacters = ({ collection }: Props) => (
  <span style={{ color: 'cyan', margin: '0 1rem' }}>{collection?.length}</span>
);

export default TotalOfCharacters;
