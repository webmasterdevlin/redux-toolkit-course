import { createAsyncThunk } from '@reduxjs/toolkit';
import { VillainActionTypes, VillainModel } from './villain.types';
import { EndPoints } from 'axios/api-config';
import { deleteAxios, getAxios, postAxios } from 'axios/generic-api-calls';

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
  VillainActionTypes.REMOVE_VILLAIN_BY_ID,
  async (id: string) => {
    return await deleteAxios<void>(EndPoints.villains, id);
  },
);
