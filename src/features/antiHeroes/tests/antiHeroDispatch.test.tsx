import {
  getAntiHeroesAction,
  postAntiHeroAction,
  deleteAntiHeroAction,
} from "../antiHeroAsyncActions";
import { softDeleteAntiHeroAction } from "../antiHeroSlice";
import { AntiHeroStateType } from "../antiHeroTypes";
import { store } from "App";

describe("AntiHeroesPage dispatch", () => {
  let state: AntiHeroStateType;
  let newAntiHero = {
    id: "123",
    firstName: "Devlin",
    lastName: "Duldulao",
    house: "Angular Devs",
    knownAs: "Angular trainer",
  };

  /* Select the store.getState().antiHero again
   * before running another expect. It's just how it is */
  it("should dispatch getAntiHeroesAction", async () => {
    await store.dispatch(getAntiHeroesAction());
    state = store.getState().antiHero;
    expect(state.antiHeroes).toHaveLength(2);
  });

  it("should dispatch postAntiHeroAction", async () => {
    await store.dispatch(postAntiHeroAction(newAntiHero));
    state = store.getState().antiHero;
    expect(state.antiHeroes).toHaveLength(3);
  });

  it("should dispatch deleteAntiHeroByIdAction", async () => {
    await store.dispatch(deleteAntiHeroAction(state.antiHeroes[0].id));
    state = store.getState().antiHero;
    expect(state.antiHeroes).toHaveLength(2);
  });

  it("should dispatch removeAntiHeroByIdTemporaryAction", () => {
    store.dispatch(softDeleteAntiHeroAction(state.antiHeroes[0].id));
    state = store.getState().antiHero;
    expect(state.antiHeroes).toHaveLength(1);
  });
});
