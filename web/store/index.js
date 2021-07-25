const rootState = {
  fetchedBonds: new Map(),
  fetchedBondsMP: new Map(),
};

export const rootReducer = (state = rootState, action) => {
  switch (action.type) {
    case "ADD_BOND_DEFAULT":
      if (!state.fetchedBonds.has(action.payload.security_code)) {
        state.fetchedBonds.set(action.payload.security_code, action.payload);

        return {
          ...state,
          fetchedBonds: new Map(state.fetchedBonds),
        };
      }
    case "ADD_BOND_MP":
      if (!state.fetchedBondsMP.has(action.payload.bond_code)) {
        state.fetchedBondsMP.set(action.payload.bond_code, action.payload);
        return {
          ...state,
          fetchedBondsMP: new Map(state.fetchedBondsMP),
        };
      }

    default:
      return { ...state };
  }
};
