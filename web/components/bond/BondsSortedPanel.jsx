import { useState, useEffect, useCallback } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import BondsPanel from "../utilsComponents/BondsPanel";
import { SORTED_BONDS_TABLE_HEADER_MAPPING } from "../../constants";

const TAB_NAMES = {
  1: "Maturity",
  2: "Coupon Rate",
  3: "Par Value",
  4: "Rating",
  5: "Greifenberg Credit Score",
  6: "Yield",
  7: "Trading Volume",
};

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

  const handleRuleChange = useCallback((event, newValue) => {
    setRule(newValue);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((event, newValue) => {
    setCurrentPage(newValue);
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/sortedbonds?rule=${rule}&page=${currentPage}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const totalPage = res.totalPage;
        const data = res.data;
        setCurrentBonds(data.map((item) => item.security_code));
        setTotalPage(totalPage);
      });
  }, [rule, currentPage]);

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>Bonds Sorted by Rules</h1>
      <TabContext value={rule}>
        <MuiThemeProvider theme={theme}>
          <AppBar position='static'>
            <TabList onChange={handleRuleChange} centered={true}>
              {Object.entries(TAB_NAMES).map(([label, value], idx) => {
                return (
                  <Tab
                    label={value}
                    value={label}
                    style={{ fontWeight: "bold" }}
                    key={idx}
                  />
                );
              })}
            </TabList>
          </AppBar>
        </MuiThemeProvider>

        {Object.keys(TAB_NAMES).map((value, idx) => {
          return (
            <StyledTablePanel value={value} key={idx}>
              <BondsPanel
                bonds={currentBonds}
                mappings={SORTED_BONDS_TABLE_HEADER_MAPPING}
              />
            </StyledTablePanel>
          );
        })}

        <div className={classes.pagination}>
          <Pagination
            count={parseInt(totalPage)}
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
