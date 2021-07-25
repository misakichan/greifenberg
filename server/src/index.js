const express = require("express");
const { createConnection } = require("./database");
const { devPort } = require("../greifenberg.config");
const {
  queryBondBySecurityCode,
  queryMatrixPricingNameBySecurityCode,
  queryMatrixPricingDetailsBySecurityCode,
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

// query sorted bonds
app.get("/sortedbonds", (req, res) => {
  const rule = req.query.rule;
  const page = req.query.page;

  let result;
  switch (rule) {
    case "1":
      result = extractSortedBondsFromPage(bondsSortedByMaturity, page);
      break;
    case "2":
      result = extractSortedBondsFromPage(bondsSortedByCouponRate, page);
      break;
    case "3":
      result = extractSortedBondsFromPage(bondsSortedByParValue, page);
    default:
      break;
  }

  res.send(result);
  res.end();
});

// search single bond
app.get("/bond", (req, res) => {
  const conn = createConnection();
  const type = req.query.type;

  switch (type) {
    case "mp":
      conn.query(
        queryMatrixPricingDetailsBySecurityCode(req.query.securitycode),
        (err, result, fileds) => {
          if (result.length === 0) {
            res.send(result);
          } else {
            res.send(result[0]);
          }
          res.end();
        }
      );
      break;
    default:
      conn.query(
        queryBondBySecurityCode(req.query.securitycode),
        (err, result, fileds) => {
          res.send(result);
          res.end();
        }
      );
      break;
  }

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

app.get("/matrixpricing", (req, res) => {
  const bond_code = req.query.bondcode;
  const conn = createConnection();
  const queryString = queryMatrixPricingNameBySecurityCode(bond_code);

  conn.query(queryString, (err, result, fields) => {
    if (result.length > 0) {
      res.send({ data: result[0].matrix_name, status: 200 });
      res.end();
    } else {
      res.send({ status: 403 });
      res.end();
    }
  });

  conn.end();
});
app.listen(devPort, () => {
  console.log(`Server running on localhost:${devPort}`);
});
