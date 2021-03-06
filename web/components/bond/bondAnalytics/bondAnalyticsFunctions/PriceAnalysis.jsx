import { useMemo } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import BondsPanel from "../../../utilsComponents/BondsPanel";

const useStyles = makeStyles({
  explain: {
    fontFamily: "Poppins",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  imgs: {
    display: "flex",
    flexDirection: "column",
    width: "220px",
  },
  workflow: {
    fontFamily: "Poppins",
    display: "flex",
    alignItems: "center",
    gap: "60px",
    justifyContent: "center",
  },
  rating: {
    padding: "50px",
    fontWeight: "200",
    fontSize: "60px",
    color: "green",
  },
  h1: {
    fontSize: "38px",
    margin: "30px 0px 10px 0px",
  },
});

export default function PriceAnalysis({ bid }) {
  const classes = useStyles();
  const bondDetails = useSelector((state) => state.fetchedBonds.get(bid));

  const matrixNames = useMemo(() => {
    if (bondDetails.matrix_name) {
      return bondDetails.matrix_name
        .slice(1, -1)
        .split(" ")
        .map((item) => item.slice(1, -1));
    } else {
      return null;
    }
  });

  return (
    <div>
      {matrixNames ? null : (
        <MuiAlert severity='error'>Data is unavailable currently.</MuiAlert>
      )}
      <Accordion>
        <AccordionSummary aria-controls='panel1a-content' id='panel1a-header'>
          <MuiAlert elevation={8} variant='filled' severity='info'>
            Click to see how it works
          </MuiAlert>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <Typography className={classes.explain}>
            To price a bond which is not frequently traded , we applied the
            matrix pricing approach by finding the reference bonds , which are
            relatively liquid , with attributes matching as closely as possible
            to the target bond . The affinity between the reference bonds and
            target bond is measured by ??? Euclidean Distance" with the selected
            attributes constitute the dimensions . The search of these reference
            bonds is done by using K- nearest method, a machine learning
            algorithm . As is shown in the chart, the blue and red dot within
            the circular are candidates with acceptable proximity. The different
            colors ( i.e. blue and red) indicate that bonds selected may have
            different features other than those included in the selected
            attribute set used as the Euclidean dimensions, e.g, the ownership
            type , which is not included in the selected attribute but could be
            different from the target bond . Once the reference bonds are found
            , the weighted average yield will be assigned as the approximated
            yield of the target , with the weight being the reciprocal of the
            distance.
          </Typography>
          <div className={classes.workflow}>
            <div className={classes.h1}>Reference Bonds</div>
            <div className={classes.imgs}>
              <img src='/u1792.png' />
              <img src='/u1786.svg' />
              <img src='/u1787.png' height='180' />
            </div>
            <div>
              <div className={classes.h1}>
                Target Bond Rate:
                <span className={classes.rating}>
                  {bondDetails.cur_rating || "Unavailable"}
                </span>
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <div>
        <div className={classes.h1}>Target Bond</div>
        <BondsPanel bonds={[bid]} />
      </div>
      <div>
        <div className={classes.h1}>Reference Bonds</div>
        <BondsPanel bonds={matrixNames || []} />
      </div>
    </div>
  );
}
