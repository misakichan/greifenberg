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
    orig_rating as official_rating, cur_rating, company_name, company_code, ownership, issu_rating, issu_rater,
    sw_1, sw_2, sw_3, csrc_1, csrc_2, gics_1, gics_2, gics_3, listed, list_date, volume
    from bond_info_new where security_code = ${securityCode}`;
  },

  queryMatrixPricingBySecurityCode(securityCode) {
    return `SELECT matrix_name, cur_yield, matrix_ytm, matrix_price from matrix_pricing where bond_code = ${securityCode} and matrix_name is not null order by date DESC`;
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
