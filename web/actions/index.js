export const addBond = (bondDetails, type = "default") => {
  switch (type) {
    case "mp":
      return {
        type: "ADD_BOND_MP",
        payload: bondDetails,
      };
    default:
      return {
        type: "ADD_BOND_DEFAULT",
        payload: bondDetails,
      };
  }
};

export const addNotExistBond = (securityCode) => {
  return {
    type: "ADD_NOT_EXISTS_BOND",
    payload: securityCode,
  };
};
