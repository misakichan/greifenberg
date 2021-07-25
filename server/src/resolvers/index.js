const { createConnection } = require("../database");
const { queryBondsSortedBy } = require("../queries");
const util = require("util");

const NUMBER_BONDS_PER_PAGE = 15;

const queryBondsSortedByRule = async (rule) => {
  const conn = createConnection();
  const queryString = queryBondsSortedBy(rule);

  const query = util.promisify(conn.query).bind(conn);

  const results = await query(queryString);

  conn.end();

  return results;
};

const extractSortedBondsFromPage = (bonds, page) => {
  return bonds.slice(
    (page - 1) * NUMBER_BONDS_PER_PAGE,
    Math.min(bonds.length, page * NUMBER_BONDS_PER_PAGE)
  );
};

module.exports = {
  queryBondsSortedByRule,
  extractSortedBondsFromPage,
  NUMBER_BONDS_PER_PAGE,
};
