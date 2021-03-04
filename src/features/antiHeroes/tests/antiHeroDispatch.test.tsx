import { configureAppStore } from "store/configureStore";
import {
  getAntiHeroesAction,
  postAntiHeroAction,
  deleteAntiHeroByIdAction,
} from "../antiHeroAsyncActions";
import { removeAntiHeroByIdTemporaryAction } from "../antiHeroSlice";
import { AntiHeroStateType } from "../antiHeroTypes";

describe("AntiHeroesPage dispatch", () => {
  const store = configureAppStore();
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
  it("should dispatch getAntiHeroesAction", async function () {
    await store.dispatch(getAntiHeroesAction());
    state = store.getState().antiHero;
    expect(state.antiHeroes).toHaveLength(6);
  });

  it("should dispatch postAntiHeroAction", async function () {
    await store.dispatch(postAntiHeroAction(newAntiHero));
    state = store.getState().antiHero;
    expect(state.antiHeroes).toHaveLength(7);
  });

  it("should dispatch deleteAntiHeroByIdAction", async function () {
    await store.dispatch(deleteAntiHeroByIdAction(state.antiHeroes[0].id));
    state = store.getState().antiHero;
    expect(state.antiHeroes).toHaveLength(6);
  });

  it("should dispatch removeAntiHeroByIdTemporaryAction", function () {
    store.dispatch(removeAntiHeroByIdTemporaryAction(state.antiHeroes[0].id));
    state = store.getState().antiHero;
    expect(state.antiHeroes).toHaveLength(5);
  });
});
