import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  deleteAntiHeroByIdAction,
  getAntiHeroesAction,
  postAntiHeroAction,
} from './anti-hero.async.actions';
import {
  AntiHeroModel,
  antiHeroNamespace,
  AntiHeroStateType,
} from './anti-hero.types';

export const initialState: AntiHeroStateType = {
  antiHero: {
    firstName: '',
    house: '',
    id: '',
    knownAs: '',
    lastName: '',
  },
  antiHeroes: [],
  error: '',
  loading: false,
};

export const antiHeroSlice = createSlice({
  // name is your (feature, module, namespace, context). The terminologies here can be interchangeable.
  name: antiHeroNamespace,

  // initialState is the default value
  initialState,

  // mutate using non-asynchronous actions
  reducers: {
    removeAntiHeroByIdTemporaryAction: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.antiHeroes = state.antiHeroes.filter(
        ah => ah.id !== action.payload,
      );
    },
  },

  // mutate using asynchronous actions
  extraReducers: builder => {
    /* GET ALL */
    builder.addCase(getAntiHeroesAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getAntiHeroesAction.fulfilled, (state, action) => {
      state.antiHeroes = action?.payload;
      state.loading = false;
    });

    builder.addCase(getAntiHeroesAction.rejected, (state, action: any) => {
      state.error = action?.payload?.message;
      state.loading = false;
    });

    /* POST */
    builder.addCase(postAntiHeroAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(postAntiHeroAction.fulfilled, (state, action) => {
      state.antiHeroes.push(action?.payload);
      state.loading = false;
    });

    builder.addCase(postAntiHeroAction.rejected, (state, action: any) => {
      state.error = action?.payload?.message;
      state.loading = false;
    });

    /* DELETE - Optimistic update */
    builder.addCase(deleteAntiHeroByIdAction.pending, (state, action) => {
      state.tempData = [...state.antiHeroes];
      state.error = '';
      const index = state.antiHeroes.findIndex(ah => ah.id === action.meta.arg);
      state.antiHeroes.splice(index, 1);
    });

    builder.addCase(deleteAntiHeroByIdAction.rejected, (state, action: any) => {
      state.error = action?.error?.message;
      state.antiHeroes = state.tempData as AntiHeroModel[];
    });
  },
});

/* non-async actions */
export const { removeAntiHeroByIdTemporaryAction } = antiHeroSlice.actions;

export default antiHeroSlice.reducer;
