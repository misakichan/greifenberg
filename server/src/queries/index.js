function _queryBondsSortedBy(field, order) {
  return `SELECT id, security_code, face_value as par_value, coup_cur as coupon_rate, datediff(curdate(), matu_date) / 356 as maturity 
  from bond_info_new where security_code != 0 order by ${field} ${order}`;
}

module.exports = {
  queryBondById(id) {
    return `SELECT id, bond_name as name, bond_code, security_code, security_name as abbreviation, 
    face_value as par_value, coup_cur as coupon_rate, datediff(curdate(), matu_date) / 356 as maturity, 
    orig_rating as official_rating from bond_info_new where id = ${id}`;
  },
  queryBondBySecurityCode(securityCode) {
    return `SELECT id, bond_name as name, bond_code, security_code, security_name as abbreviation, 
    face_value as par_value, coup_cur as coupon_rate, datediff(curdate(), matu_date) / 356 as maturity, 
    orig_rating as official_rating, cur_rating, company_name, company_code from bond_info_new where security_code = ${securityCode}`;
  },
  queryMatrixPricingNameBySecurityCode(securityCode) {
    return `SELECT matrix_name from matrix_pricing where bond_code = ${securityCode} and matrix_name is not null order by date DESC`;
  },
  queryMatrixPricingDetailsBySecurityCode(securityCode) {
    return `SELECT bond_code, company_name, maturity / 365 as maturity, coupon, volume, cur_yield, matrix_ytm, matrix_price from matrix_pricing where bond_code=${securityCode} order by date desc`;
  },
  queryBondsSortedBy(rule, order = "DESC") {
    switch (rule) {
      case "1":
        return _queryBondsSortedBy("maturity", order);
      case "2":
        return _queryBondsSortedBy("coupon_rate", order);
      case "3":
        return _queryBondsSortedBy("par_value", order);
      default:
        return _queryBondsSortedBy("maturity", order);
    }
  },
};
