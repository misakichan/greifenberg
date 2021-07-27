import styles from "../../styles/components/BondSearchPanel.module.css";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBond } from "../../actions";
import { useRouter } from "next/router";

export default function BondSearchPanel() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [currentText, setCurrentText] = useState("");
  const [bondId, setBondId] = useState(null);
  const fetchedBonds = useSelector((state) => state.fetchedBonds);

  const handleChange = (e) => {
    setCurrentText(e.target.value);
  };

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!fetchedBonds.get(currentText)) {
      fetch(`http://localhost:5000/bond?securitycodes="${currentText}"`)
        .then((res) => res.json())
        .then((res) => {
          if (res.length === 0) {
            return;
          } else {
            dispatch(addBond(res[0]));
            setBondId(res[0].security_code);
          }
        });
    }
  });

  useEffect(() => {
    if (bondId) {
      router.push(`/bond/${bondId}`);
    }
  }, [bondId]);

  return (
    <form className={styles.search_panel} onSubmit={handleSubmit}>
      <div>
        <input
          type='text'
          id='nameOrId'
          placeholder='Enter bond name or ID'
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Search</button>
      </div>
    </form>
  );
}
