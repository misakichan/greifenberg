const rootState = {
  fetchedBonds: new Map(),
};

export const rootReducer = (state = rootState, action) => {
  switch (action.type) {
    case "ADD_BONDS":
      action.payload.forEach((bond) =>
        state.fetchedBonds.set(bond.security_code, bond)
      );
      return {
        ...state,
        fetchedBonds: new Map(state.fetchedBonds),
      };
    case "ADD_BOND_DEFAULT":
      if (!state.fetchedBonds.has(action.payload.security_code)) {
        state.fetchedBonds.set(action.payload.security_code, action.payload);

        return {
          ...state,
          fetchedBonds: new Map(state.fetchedBonds),
        };
      }
    default:
      return { ...state };
  }
};
