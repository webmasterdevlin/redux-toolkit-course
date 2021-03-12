import { createAsyncThunk } from "@reduxjs/toolkit";
import { EndPoints } from "axios/api-config";
import { AntiHeroActionTypes, AntiHeroModel } from "./antiHeroTypes";
import { deleteAxios, getAxios, postAxios } from "axios/generic-api-calls";

export const getAntiHeroesAction = createAsyncThunk(
  AntiHeroActionTypes.FETCH_ANTI_HEROES,
  async () => {
    const { data } = await getAxios<AntiHeroModel>(EndPoints.antiHeroes);

    return data;
  }
);

export const postAntiHeroAction = createAsyncThunk(
  AntiHeroActionTypes.ADD_ANTI_HERO,
  async (antiHero: AntiHeroModel) => {
    const { data } = await postAxios<AntiHeroModel>(
      EndPoints.antiHeroes,
      antiHero
    );

    return data;
  }
);

export const deleteAntiHeroAction = createAsyncThunk(
  AntiHeroActionTypes.REMOVE_ANTI_HERO_BY_ID,
  async (id: string) => {
    return await deleteAxios<void>(EndPoints.antiHeroes, id);
  }
);
