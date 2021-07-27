const express = require("express");
const { createConnection } = require("./database");
const { devPort } = require("../greifenberg.config");
const {
  queryBondBySecurityCode,
  queryMatrixPricingBySecurityCode,
} = require("./queries");
const {
  queryBondsSortedByRule,
  extractSortedBondsFromPage,
  NUMBER_BONDS_PER_PAGE,
} = require("./resolvers");
const cors = require("cors");

const app = express();

let bondsSortedByMaturity;
let bondsSortedByCouponRate;
let bondsSortedByParValue;

queryBondsSortedByRule("1").then((res) => {
  bondsSortedByMaturity = res.filter((item) => item.maturity !== null);
  console.log(
    `Fetched bonds sorted by Maturity, got ${bondsSortedByMaturity.length}`
  );
});

queryBondsSortedByRule("2").then((res) => {
  bondsSortedByCouponRate = res.filter((item) => item.coupon_rate !== null);
  console.log(
    `Fetched bonds sorted by Coupon rate, got ${bondsSortedByCouponRate.length}`
  );
});

queryBondsSortedByRule("3").then((res) => {
  bondsSortedByParValue = res.filter((item) => item.par_value !== null);
  console.log(
    `Fetched bonds sorted by Par Value, got ${bondsSortedByParValue.length}`
  );
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const buildResults = (arr, page) => {
  let result = {};
  result["data"] = extractSortedBondsFromPage(arr, page);
  result["totalPage"] = JSON.stringify(
    Math.ceil(arr.length / NUMBER_BONDS_PER_PAGE)
  );
  return result;
};
// query sorted bonds
app.get("/sortedbonds", (req, res) => {
  const rule = req.query.rule;
  const page = req.query.page;

  let result;
  switch (rule) {
    case "1":
      result = buildResults(bondsSortedByMaturity, page);
      break;
    case "2":
      result = buildResults(bondsSortedByCouponRate, page);
      break;
    case "3":
      result = buildResults(bondsSortedByParValue, page);
    default:
      result = buildResults(bondsSortedByParValue, page);
      break;
  }

  res.send(result);
  res.end();
});

/**
 * Search for single bond, get all required fields
 * returned Fields are listed in "./queries/index.js"
 * In following router,
 * queryBondBySecurityCode(sc) generate the query string for "conn" to query result related to bond
 * queryMatrixPricingBySecurityCode(sc) generate the query string for "conn" to query fields related to matrix pricing
 */

app.get("/bond", async (req, res) => {
  const conn = createConnection({ multipleStatements: true });
  const codes = req.query.securitycodes;
  const bondsResult = [];

  const codesArray = codes.split(",");

  codesArray.map((sc, idx) => {
    let bondInfo = {};
    // query bond info from bond_info_new
    conn.query(
      queryBondBySecurityCode(sc) + ";" + queryMatrixPricingBySecurityCode(sc),
      (err, result, fields) => {
        result.forEach((item) => {
          bondInfo = { ...bondInfo, ...item[0] };
        });
        bondsResult.push(bondInfo);

        if (idx === codesArray.length - 1) {
          res.send(bondsResult);
          res.end();
        }
      }
    );
  });

  conn.end();
});

app.get("/totalpage", (req, res) => {
  const rule = req.query.rule;

  switch (rule) {
    case "1":
      res.send(
        JSON.stringify(
          Math.ceil(bondsSortedByMaturity.length / NUMBER_BONDS_PER_PAGE)
        )
      );
      break;
    case "2":
      res.send(
        JSON.stringify(
          Math.ceil(bondsSortedByCouponRate.length / NUMBER_BONDS_PER_PAGE)
        )
      );
      break;
    case "3":
      res.send(
        JSON.stringify(
          Math.ceil(bondsSortedByParValue.length / NUMBER_BONDS_PER_PAGE)
        )
      );
    default:
      break;
  }

  res.end();
});

app.listen(devPort, () => {
  console.log(`Server running on localhost:${devPort}`);
});
