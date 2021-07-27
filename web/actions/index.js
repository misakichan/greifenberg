export const addBond = (bondDetails) => {
  return {
    type: "ADD_BOND_DEFAULT",
    payload: bondDetails,
  };
};

export const addNotExistBond = (securityCode) => {
  return {
    type: "ADD_NOT_EXISTS_BOND",
    payload: securityCode,
  };
};

export const addBonds = (bonds) => {
  return {
    type: "ADD_BONDS",
    payload: bonds,
  };
};
