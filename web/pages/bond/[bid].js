import { useRouter } from "next/router";
import { NavBar } from "../../components/NavBar";
import { Button, makeStyles } from "@material-ui/core";
import { useCallback, useEffect } from "react";
import BondDetails from "../../components/bond/bondAnalytics/BondDetails";
import BondAnalyticsPanel from "../../components/bond/bondAnalytics/BondAnalyticsPanel";
import { useDispatch, useSelector } from "react-redux";
import { addBond } from "../../actions";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    top: "80px",
  },
  backbutton: {
    position: "absolute",
    top: "90px",
    left: "20%",
    fontWeight: "bold",
  },
}));

const Bond = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const fetchedBonds = useSelector((state) => state.fetchedBonds);
  const router = useRouter();
  const { bid } = router.query;

  useEffect(() => {
    if (fetchedBonds.has(bid)) return;

    fetch(`http://localhost:5000/bond?securitycode="${bid}"`)
      .then((res) => res.json())
      .then((res) => {
        dispatch(addBond(res[0], "default"));
      });
  }, []);

  const back = useCallback(() => {
    router.back();
  }, []);

  const renderContent = () => {
    if (fetchedBonds.has(bid)) {
      return (
        <>
          <BondDetails bid={bid} />
          <BondAnalyticsPanel bid={bid} />
        </>
      );
    } else {
      return null;
    }
  };
  return (
    <>
      <NavBar />
      <div className={classes.root}>
        <Button
          className={classes.backbutton}
          variant='contained'
          onClick={back}>
          Back
        </Button>
        {renderContent()}
      </div>
      <footer>Copyright © 2021. All Rights Reserved.</footer>
    </>
  );
};

export default Bond;
