import styles from "../../styles/components/BondSearchPanel.module.css";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addBond } from "../../actions";
import { useRouter } from "next/router";

export default function BondSearchPanel() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [currentText, setCurrentText] = useState("");
  const [bondId, setBondId] = useState(null);

  const handleChange = (e) => {
    setCurrentText(e.target.value);
  };

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/bond?securitycode="${currentText}"`)
      .then((res) => res.json())
      .then((res) => {
        if (res.length === 0) {
          alert(`${currentText} not found.`);
        } else {
          dispatch(addBond(res[0]));
          setBondId(res[0].security_code);
        }
      });

    fetch(`http://localhost:5000/bond?securitycode="${currentText}"&type=mp`)
      .then((res) => res.json())
      .then((res) => {
        if (res.length === 0) {
          alert(`${currentText} not found.`);
        } else {
          dispatch(addBond(res, "mp"));
        }
      });
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
