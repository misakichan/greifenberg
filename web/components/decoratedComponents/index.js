import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";

export const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
      cursor: "pointer",
    },
  },
}))(TableRow);

export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#f5edda",
    color: theme.palette.common.black,
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  body: {
    fontSize: 14,
    minWidth: "180px",
    maxWidth: "300px",
  },
}))(TableCell);
