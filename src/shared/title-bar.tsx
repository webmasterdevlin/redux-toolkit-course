import React from 'react';

type Props = {
  title: string;
};

const TitleBar: React.FC<Props> = ({ title }) => (
  <div className={'mb-4'}>
    <h1>{title}</h1>
  </div>
);

export default TitleBar;
