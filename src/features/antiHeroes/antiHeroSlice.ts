import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  deleteAntiHeroAction,
  getAntiHeroesAction,
  postAntiHeroAction,
} from "./antiHeroAsyncActions";
import {
  AntiHeroModel,
  antiHeroNamespace,
  AntiHeroStateType,
} from "./antiHeroTypes";

/*antiHero state*/
// initial state or default state or initial values, it's up to you.
export const initialState: AntiHeroStateType = {
  antiHero: {} as AntiHeroModel,
  antiHeroes: [] as AntiHeroModel[],
  loading: false,
};

/*antiHero store*/
export const antiHeroSlice = createSlice({
  /*
   name: is your feature or also called module, or namespace,
   or context, etc. The terminologies here can be interchangeable.
   This is required.
  */
  name: antiHeroNamespace,

  // initialState is the default value and it is required.
  initialState: initialState,

  // mutate using non-asynchronous actions
  reducers: {
    softDeleteAntiHeroAction: (state, action: PayloadAction<string>) => {
      state.antiHeroes = state.antiHeroes.filter(
        (ah) => ah.id !== action.payload
      );
    },
  },

  // mutate using asynchronous actions
  extraReducers: (builder) => {
    /* GET ALL */
    builder.addCase(getAntiHeroesAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getAntiHeroesAction.fulfilled, (state, action) => {
      state.antiHeroes = action?.payload;
      state.loading = false;
    });

    builder.addCase(getAntiHeroesAction.rejected, (state, action: any) => {
      console.log(action?.error);
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
      console.log(action?.error);
      state.loading = false;
    });

    /* DELETE - Optimistic update */
    builder.addCase(deleteAntiHeroAction.pending, (state, action) => {
      state.tempData = [...state.antiHeroes];
      const index = state.antiHeroes.findIndex(
        (ah) => ah.id === action.meta.arg
      );
      state.antiHeroes.splice(index, 1);
    });

    builder.addCase(deleteAntiHeroAction.rejected, (state, action: any) => {
      console.log(action?.error);
      state.antiHeroes = state.tempData as AntiHeroModel[];
    });
  },
});

/* export all non-async actions */
export const { softDeleteAntiHeroAction } = antiHeroSlice.actions;

export default antiHeroSlice.reducer;
