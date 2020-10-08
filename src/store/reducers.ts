/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { combineReducers } from 'redux';

import antiHeroReducer from '../features/anti-heroes/anti-hero.slice';
import heroReducer from '../features/heroes/hero.slice';
import villainReducer from '../features/villains/villain.slice';

/*Merges the main reducer with the router state and dynamically injected reducers*/
/*place all reducers here separated by commas. For example, heroReducer*/
const injectedReducers = {
  hero: heroReducer,
  villain: villainReducer,
  antiHero: antiHeroReducer,
};

const rootReducer = combineReducers({
  ...injectedReducers,
});

export type RootState = ReturnType<typeof rootReducer>;

export const createReducer = () => rootReducer;
