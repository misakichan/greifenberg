import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PriceAnalysis from "./bondAnalyticsFunctions/PriceAnalysis";

const TAB_TITLES = [
  "Issuer's Profile",
  "Credit Risk Analysis",
  "Business Ecological Analysis",
  "Return/Yield Analysis",
  "Pricing Analysis",
  "Sentiment Analysis",
  "Case Study",
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    flexGrow: 1,
    width: "60%",
    backgroundColor: theme.palette.background.paper,
    left: "50%",
    transform: "translateX(-50%)",
    marginTop: "10px",
    marginBottom: "180px",
  },
}));

export default function BondAnalyticsPanel({ bid }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Tabs
          value={value}
          onChange={handleChange}
          centered={true}
          aria-label='bond analytics tabs'>
          {TAB_TITLES.map((header, idx) => {
            return (
              <Tab
                label={header}
                {...a11yProps(idx)}
                key={idx}
                style={{ fontWeight: "bold" }}
              />
            );
          })}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Test
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        <PriceAnalysis bid={bid}></PriceAnalysis>
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </div>
  );
}
