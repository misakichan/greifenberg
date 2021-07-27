import { useCallback } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)",
    textAlign: "center",
    color: "#c5a872",
  },
  root: {
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Poppins",
    gap: "60px",
    height: "80px",
    color: "black",
    width: "50%",
    borderRadius: "10px",
    // animation: "0.5s $leftIn forwards",
    "& span": {
      padding: "10px",
      fontSize: "18px",
    },
  },
  h4: {
    margin: "0px",
    fontWeight: "bold",
  },
  entry: {
    padding: "5px",
    textAlign: "center",
    "&:hover": {
      backgroundColor: "ghostwhite",
      color: "#c5a872",
    },
  },
  "@keyframes leftIn": {
    from: {
      left: "-50%",
      opacity: 0,
    },

    to: {
      left: "50%",
      transform: "translateX(-50%)",
      opacity: 1,
    },
  },
}));

export default function BondDetails({ bid }) {
  const classes = useStyles();

  const bondDetails = useSelector((state) => state.fetchedBonds.get(bid));

  const renderEntry = useCallback((field, value) => {
    return (
      <div className={classes.entry}>
        <p className={classes.h4}>{field}:</p>
        {value ? (
          <span>{value}</span>
        ) : (
          <span className={classes.notAvailable}>-------</span>
        )}
      </div>
    );
  });

  return (
    <div>
      <h1 className={classes.title}>{bondDetails.name}</h1>
      <div className={classes.root}>
        {renderEntry("Security Code", bondDetails.security_code)}
        {renderEntry("Abbreviation", bondDetails.abbreviation)}
        {renderEntry("Par Value", bondDetails.par_value)}
        {renderEntry("Coupon Rate", bondDetails.coupon_rate)}
        {renderEntry("Maturity", bondDetails.maturity)}
        {renderEntry("Official Rate", bondDetails.official_rating)}
      </div>
    </div>
  );
}
