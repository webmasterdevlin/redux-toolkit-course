export type HeroStateType = {
  readonly heroes: HeroModel[];
  readonly hero: HeroModel;
  readonly loading: boolean;
  readonly tempData?: any[];
};

export type ApiResponse = Record<string, any>;

export type HeroModel = {
  id: string;
  firstName: string;
  lastName: string;
  house: string;
  knownAs: string;
} & ApiResponse;

export const heroNamespace = "hero";

/* action types */
export const HeroActionTypes = {
  FETCH_HEROES: `${heroNamespace}/FETCH_HEROES`,
  FETCH_HERO_BY_ID: `${heroNamespace}/FETCH_HEROES_BY_ID`,
  REMOVE_HERO_BY_ID: `${heroNamespace}/REMOVE_HERO_BY_ID`,
  ADD_HERO: `${heroNamespace}/ADD_HERO`,
  UPDATE_HERO: `${heroNamespace}/UPDATE_HERO`,
};
