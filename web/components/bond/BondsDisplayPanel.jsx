import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import BondEntry from "./BondEntry";
import { StyledTableCell } from "../decoratedComponents";
import { SORTED_BONDS_TABLE_HEADER_MAPPING } from "../../constants";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  table: {
    margin: "auto auto",
  },
});

export default function BondsDisplayPanel({ bonds }) {
  const classes = useStyles();
  const dataSource = useSelector((state) => state.fetchedBonds);
  const renderBody = () => {
    if (bonds.length === 0) {
      return <TableBody></TableBody>;
    } else {
      return (
        <TableBody>
          {bonds.map((id) => {
            return <BondEntry key={id} id={id} dataSource={dataSource} />;
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
            {Object.keys(SORTED_BONDS_TABLE_HEADER_MAPPING).map(
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
