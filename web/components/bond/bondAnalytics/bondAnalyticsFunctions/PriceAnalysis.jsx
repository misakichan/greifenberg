import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { MATRIX_PRICING_DETAILS_TABLE_HEADER_MAPPING } from "../../../../constants";
import { StyledTableCell } from "../../../decoratedComponents";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import BondEntry from "../../BondEntry";
import MuiAlert from "@material-ui/lab/Alert";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  table: {
    margin: "auto auto",
  },
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
});

// this is a table component
function ReferenceBondsPanel({ bonds }) {
  const classes = useStyles();
  const renderBody = () => {
    if (bonds.length === 0) {
      return <TableBody></TableBody>;
    } else {
      return (
        <TableBody>
          {bonds.map((id) => {
            return (
              <BondEntry
                key={id}
                id={id}
                type='mp'
                mappings={MATRIX_PRICING_DETAILS_TABLE_HEADER_MAPPING}
              />
            );
          })}
        </TableBody>
      );
    }
  };

  return (
    <TableContainer component={Paper} style={{ borderRadius: 0 }}>
      <Table className={classes.table} aria-label='customized table'>
        <TableHead>
          <TableRow>
            {Object.keys(MATRIX_PRICING_DETAILS_TABLE_HEADER_MAPPING).map(
              (header, idx) => {
                return (
                  <StyledTableCell align='left' key={idx}>
                    {header}
                  </StyledTableCell>
                );
              }
            )}
          </TableRow>
        </TableHead>
        {renderBody()}
      </Table>
    </TableContainer>
  );
}

function TargetBondPanel({ bid }) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper} style={{ borderRadius: 0 }}>
      <Table className={classes.table} aria-label='customized table'>
        <TableHead>
          <TableRow>
            {Object.keys(MATRIX_PRICING_DETAILS_TABLE_HEADER_MAPPING).map(
              (header, idx) => {
                return (
                  <StyledTableCell align='left' key={idx}>
                    {header}
                  </StyledTableCell>
                );
              }
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          <BondEntry
            key={bid}
            id={bid}
            type='mp'
            mappings={MATRIX_PRICING_DETAILS_TABLE_HEADER_MAPPING}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function PriceAnalysis({ bid }) {
  const classes = useStyles();
  const bondDetails = useSelector((state) => state.fetchedBonds.get(bid));
  const [noReturn, setNoReturn] = useState(false);

  const [matrixNames, setMatrixNames] = useState([]);

  useEffect(() => {
    const bondCode = bondDetails.security_code;
    fetch(`http://localhost:5000/matrixpricing?bondcode="${bondCode}"`)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 403) {
          setNoReturn(true);
        } else {
          setMatrixNames(
            res.data
              .slice(1, -1)
              .split(" ")
              .map((item) => item.slice(1, -1))
          );
        }
      });
  }, [bid]);

  return (
    <div>
      {noReturn ? (
        <MuiAlert severity='error'>Data is unavailable currently.</MuiAlert>
      ) : null}
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
            target bond is measured by “ Euclidean Distance" with the selected
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
            <h2>Reference Bonds</h2>
            <div className={classes.imgs}>
              <img src='/u1792.png' />
              <img src='/u1786.svg' />
              <img src='/u1787.png' height='180' />
            </div>
            <div>
              <h2>
                Target Bond Rate:
                <span className={classes.rating}>
                  {bondDetails.cur_rating || "Unavailable"}
                </span>
              </h2>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <div>
        <h1 className={classes.h1}>Target Bond</h1>
        <TargetBondPanel bid={bid} />
      </div>
      <div>
        <h1 className={classes.h1}>Reference Bonds</h1>
        <ReferenceBondsPanel bonds={matrixNames} />
      </div>
    </div>
  );
}
