import { makeStyles } from "@material-ui/core/styles";
import { MATRIX_PRICING_DETAILS_TABLE_HEADER_MAPPING } from "../../constants";
import { StyledTableCell } from "../decoratedComponents";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import BondEntry from "../bond/BondEntry";

const useStyles = makeStyles({
  table: {
    margin: "auto auto",
  },
});

// this is a table component
export default function BondsPanel({
  bonds,
  mappings = MATRIX_PRICING_DETAILS_TABLE_HEADER_MAPPING,
}) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper} style={{ borderRadius: 0 }}>
      <Table className={classes.table} aria-label='customized table'>
        <TableHead>
          <TableRow>
            {Object.keys(mappings).map((header, idx) => {
              return (
                <StyledTableCell align='left' key={idx}>
                  {header}
                </StyledTableCell>
              );
            })}
          </TableRow>
        </TableHead>
        {bonds.length ? (
          <TableBody>
            {bonds.map((id) => {
              return <BondEntry key={id} id={id} mappings={mappings} />;
            })}
          </TableBody>
        ) : null}
      </Table>
    </TableContainer>
  );
}
