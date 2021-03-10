import {
  getHeroesAction,
  postHeroAction,
  deleteHeroByIdAction,
} from "../heroAsyncActions";
import { removeHeroByIdTemporaryAction } from "../heroSlice";
import { HeroStateType } from "../heroTypes";
import { store } from "App";

describe("HeroesPage dispatch", () => {
  let state: HeroStateType;
  let newHero = {
    id: "123",
    firstName: "Devlin",
    lastName: "Duldulao",
    house: "Angular Devs",
    knownAs: "Angular trainer",
  };

  /* Select the store.getState().hero again
   * before running another expect. It's just how it is */
  it("should dispatch getHeroesAction", async function () {
    await store.dispatch(getHeroesAction());
    state = store.getState().hero;
    expect(state.heroes).toHaveLength(5);
  });

  it("should dispatch postHeroAction", async function () {
    await store.dispatch(postHeroAction(newHero));
    state = store.getState().hero;
    expect(state.heroes).toHaveLength(6);
  });

  it("should dispatch deleteHeroByIdAction", async function () {
    await store.dispatch(deleteHeroByIdAction(state.heroes[0].id));
    state = store.getState().hero;
    expect(state.heroes).toHaveLength(5);
  });

  it("should dispatch removeHeroByIdTemporaryAction", function () {
    store.dispatch(removeHeroByIdTemporaryAction(state.heroes[0].id));
    state = store.getState().hero;
    expect(state.heroes).toHaveLength(4);
  });
});
