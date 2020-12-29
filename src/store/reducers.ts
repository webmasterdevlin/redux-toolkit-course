/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { combineReducers } from "redux";

import antiHeroReducer from "features/antiHeroes/antiHeroSlice";
import heroReducer from "features/heroes/heroSlice";
import villainReducer from "features/villains/villainSlice";

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
