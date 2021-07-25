import { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import BondsDisplayPanel from "./BondsDisplayPanel";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const theme = createTheme({
  overrides: {
    MuiTabs: {
      root: {
        backgroundColor: "#c5a872",
      },
      indicator: {
        backgroundColor: "black",
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    width: 1600,
    margin: "0px auto",
    fontFamily: "Poppins",
    fontWeight: "bold",
    marginBottom: "70px",
  },
  title: {
    textAlign: "center",
    color: "#c5a872",
    backgroundColor: "ghostwhite",
    margin: "0px",
    padding: "10px 0px",
  },
  pagination: {
    display: "flex",
    backgroundColor: "ghostwhite",
    justifyContent: "center",
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const StyledTablePanel = withStyles(() => ({
  root: {
    padding: 0,
  },
}))(TabPanel);

export default function BondsSortedPanel() {
  const classes = useStyles();

  const [rule, setRule] = useState("1");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentBonds, setCurrentBonds] = useState([]);
  const [totalPage, setTotalPage] = useState(null);

  const handleRuleChange = (event, newValue) => {
    setRule(newValue);
    setCurrentPage(1);
  };

  const handlePageChange = (event, newValue) => {
    setCurrentPage(newValue);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/sortedbonds?rule=${rule}&page=${currentPage}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => setCurrentBonds(res.map((item) => item.security_code)));
  }, [rule, currentPage]);

  useEffect(() => {
    fetch(`http://localhost:5000/totalpage?rule=${rule}`)
      .then((res) => res.json())
      .then((res) => setTotalPage(res));
  }, [rule]);

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>Bonds Sorted by Rules</h1>
      <TabContext value={rule}>
        <MuiThemeProvider theme={theme}>
          <AppBar position='static'>
            <TabList
              onChange={handleRuleChange}
              aria-label='sort rules'
              centered={true}>
              <Tab label='Maturity' value='1' style={{ fontWeight: "bold" }} />
              <Tab
                label='Coupon Rate'
                value='2'
                style={{ fontWeight: "bold" }}
              />
              <Tab label='Par Value' value='3' style={{ fontWeight: "bold" }} />
            </TabList>
          </AppBar>
        </MuiThemeProvider>

        <StyledTablePanel value='1'>
          <BondsDisplayPanel bonds={currentBonds} />
        </StyledTablePanel>
        <StyledTablePanel value='2'>
          <BondsDisplayPanel bonds={currentBonds} />
        </StyledTablePanel>
        <StyledTablePanel value='3'>
          <BondsDisplayPanel bonds={currentBonds} />
        </StyledTablePanel>
        <div className={classes.pagination}>
          <Pagination
            count={totalPage}
            variant='outlined'
            shape='rounded'
            onChange={handlePageChange}
            page={currentPage}
          />
        </div>
      </TabContext>
    </div>
  );
}
