export type VillainStateType = {
  readonly villains: VillainModel[];
  readonly villain: VillainModel;
  readonly loading: boolean;
  readonly tempData?: any[];
};

export type ApiResponse = Record<string, any>;

export type VillainModel = {
  id: string;
  firstName: string;
  lastName: string;
  house: string;
  knownAs: string;
} & ApiResponse;

export const villainNamespace = "villain";

/* action types */
export const VillainActionTypes = {
  FETCH_VILLAINS: `${villainNamespace}/FETCH_VILLAINS`,
  FETCH_VILLAIN_BY_ID: `${villainNamespace}/FETCH_VILLAINS_BY_ID`,
  REMOVE_VILLAIN_BY_ID: `${villainNamespace}/REMOVE_VILLAIN_BY_ID`,
  ADD_VILLAIN: `${villainNamespace}/ADD_VILLAIN`,
  UPDATE_VILLAIN: `${villainNamespace}/UPDATE_VILLAIN`,
};
