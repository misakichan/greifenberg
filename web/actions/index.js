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
