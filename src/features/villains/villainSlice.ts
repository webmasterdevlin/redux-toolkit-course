import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  deleteVillainAction,
  getVillainsAction,
  postVillainAction,
} from "./villainAsyncActions";
import {
  VillainModel,
  villainNamespace,
  VillainStateType,
} from "./villainTypes";

/*villain state*/
export const initialState: VillainStateType = {
  villain: {} as VillainModel,
  villains: [] as VillainModel[],
  loading: false,
};

/*villain store*/
export const villainSlice = createSlice({
  // name is your (feature, module, namespace, context). The terminologies here can be interchangeable.
  name: villainNamespace,

  // initialState is the default value
  initialState,

  // mutate using non-asynchronous actions
  reducers: {
    softDeleteVillainAction: (state, action: PayloadAction<string>) => {
      state.villains = state.villains.filter((v) => v.id !== action.payload);
    },
  },

  // mutate using asynchronous actions
  extraReducers: (builder) => {
    /* GET ALL */
    builder.addCase(getVillainsAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getVillainsAction.fulfilled, (state, action) => {
      state.villains = action?.payload;
      state.loading = false;
    });

    builder.addCase(getVillainsAction.rejected, (state, action: any) => {
      console.log(action?.error);
      state.loading = false;
    });

    /* POST */
    builder.addCase(postVillainAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(postVillainAction.fulfilled, (state, action) => {
      state.villains.push(action?.payload);
      state.loading = false;
    });

    builder.addCase(postVillainAction.rejected, (state, action: any) => {
      console.log(action?.error);
      state.loading = false;
    });

    /* DELETE - Optimistic update */
    builder.addCase(deleteVillainAction.pending, (state, action) => {
      state.tempData = [...state.villains];
      const index = state.villains.findIndex((v) => v.id === action.meta.arg);
      state.villains.splice(index, 1);
    });

    builder.addCase(deleteVillainAction.rejected, (state, action: any) => {
      console.log(action?.error);
      state.villains = state.tempData as VillainModel[];
    });
  },
});

/* non-async actions */
export const { softDeleteVillainAction } = villainSlice.actions;

export default villainSlice.reducer;
