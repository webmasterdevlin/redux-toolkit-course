import { createAsyncThunk } from '@reduxjs/toolkit';
import { EndPoints } from '../../axios-http-client/api-config';
import { VillainActionTypes, VillainModel } from './villain.types';
import {
  deleteAxios,
  getAxios,
  postAxios,
} from '../../axios-http-client/generic-api-calls';

export const getVillainsAction = createAsyncThunk(
  VillainActionTypes.FETCH_VILLAINS,
  async () => {
    return (await getAxios<VillainModel>(EndPoints.villains)).data;
  },
);

export const postVillainAction = createAsyncThunk(
  VillainActionTypes.ADD_VILLAIN,
  async (villain: VillainModel) => {
    return (await postAxios<VillainModel>(EndPoints.villains, villain)).data;
  },
);

export const deleteVillainByIdAction = createAsyncThunk(
  VillainActionTypes.REMOVE_VILLAIN,
  async (id: string) => {
    return await deleteAxios<void>(EndPoints.villains, id);
  },
);
