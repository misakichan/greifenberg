import { useSelector, useDispatch } from "react-redux";
import { addBond } from "../../actions";
import { useEffect, useState } from "react";
import { StyledTableCell, StyledTableRow } from "../decoratedComponents";
import { SORTED_BONDS_TABLE_HEADER_MAPPING } from "../../constants";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useRouter } from "next/router";

const notAvailable = <div style={{ color: "gray" }}>Not Available</div>;

export default function BondEntry({
  id,
  type = "default",
  mappings = SORTED_BONDS_TABLE_HEADER_MAPPING,
}) {
  const dispatch = useDispatch();
  const [isNull, setIsNull] = useState(false);
  const fetchedBonds = useSelector((state) => state.fetchedBonds);
  const fetchedBondsMP = useSelector((state) => state.fetchedBondsMP);

  const router = useRouter();

  const handleDoubleClick = () => {
    router.push(`/bond/${id}`);
  };

  useEffect(() => {
    if (!fetchedBonds.has(id)) {
      fetch(`http://localhost:5000/bond?securitycode="${id}"`)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          dispatch(addBond(res[0]));
        });
    }
  }, []);

  useEffect(() => {
    if (!fetchedBondsMP.has(id)) {
      fetch(`http://localhost:5000/bond?securitycode="${id}"&type=mp`)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.length === 0) {
            setIsNull(true);
            return;
          }
          dispatch(addBond(res, "mp"));
        });
    }
  }, []);

  const bondDetailsDefault = fetchedBonds.get(id);
  const bondDetailsMP = fetchedBondsMP.get(id);

  const renderFields = (field) => {
    if (type === "mp") {
      return bondDetailsMP || bondDetailsDefault ? (
        (bondDetailsMP || bondDetailsDefault)[field] || notAvailable
      ) : isNull ? null : (
        <CircularProgress size={14} />
      );
    } else {
      return bondDetailsDefault ? (
        bondDetailsDefault[field] || notAvailable
      ) : (
        <CircularProgress size={14} />
      );
    }
  };
  return (
    <>
      <StyledTableRow onDoubleClick={handleDoubleClick}>
        {Object.values(mappings).map((field, idx) => {
          return (
            <StyledTableCell component='th' scope='row' key={idx}>
              {renderFields(field)}
            </StyledTableCell>
          );
        })}
      </StyledTableRow>
    </>
  );
}
