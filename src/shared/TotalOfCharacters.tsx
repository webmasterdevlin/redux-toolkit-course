import React from 'react';

type Props = {
  collection: any[];
};

const TotalOfCharacters: React.FC<Props> = ({ collection }) => (
  <span style={{ color: 'cyan' }}>{collection?.length}</span>
);

export default TotalOfCharacters;
