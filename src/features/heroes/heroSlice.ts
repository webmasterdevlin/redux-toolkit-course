import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  deleteHeroAction,
  getHeroesAction,
  postHeroAction,
} from "./heroAsyncActions";
import { HeroModel, heroNamespace, HeroStateType } from "./heroTypes";

/*hero state*/
export const initialState: HeroStateType = {
  hero: {} as HeroModel,
  heroes: [] as HeroModel[],
  loading: false,
};

/*hero store*/
export const heroSlice = createSlice({
  // name is your (feature, module, namespace, context). The terminologies here can be interchangeable.
  name: heroNamespace,

  // initialState is the default value
  initialState,

  // mutate using non-asynchronous actions
  reducers: {
    softDeleteHeroAction: (state, action: PayloadAction<string>) => {
      state.heroes = state.heroes.filter((h) => h.id !== action.payload);
    },
  },

  // mutate using asynchronous actions
  extraReducers: (builder) => {
    /* GET ALL */
    builder.addCase(getHeroesAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getHeroesAction.fulfilled, (state, action) => {
      state.heroes = action?.payload;
      state.loading = false;
    });

    builder.addCase(getHeroesAction.rejected, (state, action: any) => {
      console.log(action?.error);
      state.loading = false;
    });

    /* POST */
    builder.addCase(postHeroAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(postHeroAction.fulfilled, (state, action) => {
      state.heroes.push(action?.payload);
      state.loading = false;
    });

    builder.addCase(postHeroAction.rejected, (state, action: any) => {
      console.log(action?.error);
      state.loading = false;
    });

    /* DELETE - Optimistic update */
    builder.addCase(deleteHeroAction.pending, (state, action) => {
      state.tempData = [...state.heroes];
      const index = state.heroes.findIndex((h) => h.id === action.meta.arg);
      state.heroes.splice(index, 1);
    });

    builder.addCase(deleteHeroAction.rejected, (state, action: any) => {
      console.log(action?.error);
      state.heroes = state.tempData as HeroModel[];
    });
  },
});

/* non-async actions */
export const { softDeleteHeroAction } = heroSlice.actions;

export default heroSlice.reducer;
