import { createAsyncThunk } from '@reduxjs/toolkit';
import { HeroActionTypes, HeroModel } from './hero.types';
import { EndPoints } from 'axios/api-config';
import { deleteAxios, getAxios, postAxios } from 'axios/generic-api-calls';

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
  HeroActionTypes.REMOVE_HERO_BY_ID,
  async (id: string) => {
    return await deleteAxios<void>(EndPoints.heroes, id);
  },
);
