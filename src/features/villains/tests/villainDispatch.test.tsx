import {
  getVillainsAction,
  postVillainAction,
  deleteVillainByIdAction,
} from "../villainAsyncActions";
import { removeVillainByIdTemporaryAction } from "../villainSlice";
import { VillainStateType } from "../villainTypes";
import { store } from "../../../App";

describe("VillainsPage dispatch", () => {
  let state: VillainStateType;
  let newVillain = {
    id: "123",
    firstName: "Devlin",
    lastName: "Duldulao",
    house: "Angular Devs",
    knownAs: "Angular trainer",
  };

  /* Select the store.getState().villain again
   * before running another expect. It's just how it is */
  it("should dispatch getVillainsAction", async function () {
    await store.dispatch(getVillainsAction());
    state = store.getState().villain;
    expect(state.villains).toHaveLength(2);
  });

  it("should dispatch postVillainAction", async function () {
    await store.dispatch(postVillainAction(newVillain));
    state = store.getState().villain;
    expect(state.villains).toHaveLength(3);
  });

  it("should dispatch deleteVillainByIdAction", async function () {
    await store.dispatch(deleteVillainByIdAction(state.villains[0].id));
    state = store.getState().villain;
    expect(state.villains).toHaveLength(2);
  });

  it("should dispatch removeVillainByIdTemporaryAction", function () {
    store.dispatch(removeVillainByIdTemporaryAction(state.villains[0].id));
    state = store.getState().villain;
    expect(state.villains).toHaveLength(1);
  });
});
