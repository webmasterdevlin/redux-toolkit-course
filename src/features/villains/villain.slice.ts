import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  deleteVillainByIdAction,
  getVillainsAction,
  postVillainAction,
} from './villain.async.actions';
import {
  VillainModel,
  villainNamespace,
  VillainStateType,
} from './villain.types';

/*villain state*/
export const initialState: VillainStateType = {
  villain: {} as VillainModel,
  villains: [] as VillainModel[],
  error: '',
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
    removeVillainByIdTemporaryAction: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.villains = state.villains.filter(v => v.id !== action.payload);
    },
  },

  // mutate using asynchronous actions
  extraReducers: builder => {
    /* GET ALL */
    builder.addCase(getVillainsAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getVillainsAction.fulfilled, (state, action) => {
      state.villains = action?.payload;
      state.loading = false;
    });

    builder.addCase(getVillainsAction.rejected, (state, action: any) => {
      state.error = action?.payload?.message;
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
      state.error = action?.payload?.message;
      state.loading = false;
    });

    /* DELETE - Optimistic update */
    builder.addCase(deleteVillainByIdAction.pending, (state, action) => {
      state.tempData = [...state.villains];
      state.error = '';
      const index = state.villains.findIndex(v => v.id === action.meta.arg);
      state.villains.splice(index, 1);
    });

    builder.addCase(deleteVillainByIdAction.rejected, (state, action: any) => {
      state.error = action?.error?.message;
      state.villains = state.tempData as VillainModel[];
    });
  },
});

/* non-async actions */
export const { removeVillainByIdTemporaryAction } = villainSlice.actions;

export default villainSlice.reducer;
