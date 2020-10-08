import { createAsyncThunk } from '@reduxjs/toolkit';
import { EndPoints } from '../../axios-http-client/api-config';
import { HeroActionTypes, HeroModel } from './hero.types';
import {
  deleteAxios,
  getAxios,
  postAxios,
} from '../../axios-http-client/generic-api-calls';

export const getHeroesAction = createAsyncThunk(
  HeroActionTypes.FETCH_HEROES,
  async () => {
    return (await getAxios<HeroModel>(EndPoints.heroes)).data;
  },
);

export const postHeroAction = createAsyncThunk(
  HeroActionTypes.ADD_HERO,
  async (hero: HeroModel) => {
    return (await postAxios<HeroModel>(EndPoints.heroes, hero)).data;
  },
);

export const deleteHeroByIdAction = createAsyncThunk(
  HeroActionTypes.REMOVE_HERO,
  async (id: string) => {
    return await deleteAxios<void>(EndPoints.heroes, id);
  },
);
