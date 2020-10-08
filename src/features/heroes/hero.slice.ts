import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  deleteHeroByIdAction,
  getHeroesAction,
  postHeroAction,
} from './hero.async.actions';
import { HeroModel, heroNamespace, HeroStateType } from './hero.types';

/*hero state*/
export const initialState: HeroStateType = {
  hero: {} as HeroModel,
  heroes: [] as HeroModel[],
  error: '',
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
    removeHeroByIdTemporaryAction: (state, action: PayloadAction<string>) => {
      state.heroes = state.heroes.filter(h => h.id !== action.payload);
    },
  },

  // mutate using asynchronous actions
  extraReducers: builder => {
    /* GET ALL */
    builder.addCase(getHeroesAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getHeroesAction.fulfilled, (state, action) => {
      state.heroes = action?.payload;
      state.loading = false;
    });

    builder.addCase(getHeroesAction.rejected, (state, action: any) => {
      state.error = action?.payload?.message;
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
      state.error = action?.payload?.message;
      state.loading = false;
    });

    /* DELETE - Optimistic update */
    builder.addCase(deleteHeroByIdAction.pending, (state, action) => {
      state.tempData = [...state.heroes];
      state.error = '';
      const index = state.heroes.findIndex(h => h.id === action.meta.arg);
      state.heroes.splice(index, 1);
    });

    builder.addCase(deleteHeroByIdAction.rejected, (state, action: any) => {
      state.error = action?.error?.message;
      state.heroes = state.tempData as HeroModel[];
    });
  },
});

/* non-async actions */
export const { removeHeroByIdTemporaryAction } = heroSlice.actions;

export default heroSlice.reducer;
