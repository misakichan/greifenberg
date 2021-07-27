import { useSelector, useDispatch } from "react-redux";
import { addBond, addNotExistBond } from "../../actions";
import { useEffect, useState, useCallback, useMemo } from "react";
import { StyledTableCell, StyledTableRow } from "../decoratedComponents";
import { SORTED_BONDS_TABLE_HEADER_MAPPING } from "../../constants";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useRouter } from "next/router";

const notAvailable = <div style={{ color: "gray" }}>Not Available</div>;

export default function BondEntry({
  id,
  mappings = SORTED_BONDS_TABLE_HEADER_MAPPING,
}) {
  const dispatch = useDispatch();
  const fetchedBonds = useSelector((state) => state.fetchedBonds);
  const router = useRouter();

  const handleDoubleClick = useCallback(() => {
    router.push(`/bond/${id}`);
  }, [id]);

  useEffect(() => {
    if (!fetchedBonds.has(id)) {
      fetch(`http://localhost:5000/bond?securitycodes="${id}"`)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          dispatch(addBond(res[0]));
        });
    }
  }, []);

  const bondDetails = useMemo(() => {
    return fetchedBonds.get(id);
  }, [fetchedBonds, id]);

  return (
    <>
      <StyledTableRow onDoubleClick={handleDoubleClick}>
        {Object.values(mappings).map((field, idx) => {
          return (
            <StyledTableCell component='th' scope='row' key={idx}>
              {bondDetails ? (
                bondDetails[field] || notAvailable
              ) : (
                <CircularProgress size={14} />
              )}
            </StyledTableCell>
          );
        })}
      </StyledTableRow>
    </>
  );
}
