import { createAsyncThunk } from "@reduxjs/toolkit";
import { VillainActionTypes, VillainModel } from "./villainTypes";
import { EndPoints } from "axios/api-config";
import { deleteAxios, getAxios, postAxios } from "axios/generic-api-calls";

export const getVillainsAction = createAsyncThunk(
  VillainActionTypes.FETCH_VILLAINS,
  async () => {
    const { data } = await getAxios<VillainModel>(EndPoints.villains);

    return data;
  }
);

export const postVillainAction = createAsyncThunk(
  VillainActionTypes.ADD_VILLAIN,
  async (villain: VillainModel) => {
    const { data } = await postAxios<VillainModel>(EndPoints.villains, villain);

    return data;
  }
);

export const deleteVillainByIdAction = createAsyncThunk(
  VillainActionTypes.REMOVE_VILLAIN_BY_ID,
  async (id: string) => {
    return await deleteAxios<void>(EndPoints.villains, id);
  }
);
