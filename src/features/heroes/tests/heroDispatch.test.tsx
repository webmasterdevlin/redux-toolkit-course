import { v4 as uuidv4 } from "uuid";

import { softDeleteHeroAction } from "../heroSlice";
import { HeroStateType } from "../heroTypes";
import { store } from "App";
import {
  getHeroesAction,
  postHeroAction,
  deleteHeroAction,
} from "../heroAsyncActions";

describe("HeroesPage dispatch", () => {
  let state: HeroStateType;
  let newHero = {
    id: uuidv4(),
    firstName: "Geralt",
    lastName: "Witcher",
    house: "The Withcers",
    knownAs: "Geralt of Rivia",
  };

  /* Select the store.getState().hero again
   * before running another expect. It's just how it is */
  it("should dispatch getHeroesAction", async () => {
    await store.dispatch(getHeroesAction());
    state = store.getState().hero;
    expect(state.heroes).toHaveLength(2);
  });

  it("should dispatch deleteHeroByIdAction", async function () {
    await store.dispatch(deleteHeroAction(state.heroes[0].id));
    state = store.getState().hero;
    expect(state.heroes).toHaveLength(2);
  });

  it("should dispatch removeHeroByIdTemporaryAction", () => {
    store.dispatch(softDeleteHeroAction(state.heroes[0].id));
    state = store.getState().hero;
    expect(state.heroes).toHaveLength(1);
  });

  it("should dispatch postHeroAction", async () => {
    await store.dispatch(postHeroAction(newHero));
    state = store.getState().hero;
    expect(state.heroes).toHaveLength(3);
  });
});
