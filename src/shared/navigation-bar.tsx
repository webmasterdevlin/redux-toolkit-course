import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { style } from 'typestyle';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducers';
import TotalOfCharacters from './TotalOfCharacters';

const NavigationBar = () => {
  const store = useSelector((state: RootState) => state);
  return (
    <Navbar bg="dark" expand="lg" className={'mb-5'}>
      <Nav className="mr-auto">
        <Link className={`${navStyle} p-1 m-1`} to={'/anti-heroes'}>
          Anti Heroes{' '}
          <TotalOfCharacters collection={store.antiHero.antiHeroes} />
        </Link>
        <Link className={`${navStyle} p-1 m-1`} to={'/villains'}>
          Villains <TotalOfCharacters collection={store.villain.villains} />
        </Link>
        <Link className={`${navStyle} p-1 m-1`} to={'/heroes'}>
          Heroes <TotalOfCharacters collection={store.hero.heroes} />
        </Link>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;

const navStyle = style({ color: 'white' });
