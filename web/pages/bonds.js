import { NavBar } from "../components/NavBar";
import { useCallback } from "react";
import BondSearchPanel from "../components/bond/BondSearchPanel";
import BondsSortedPanel from "../components/bond/BondsSortedPanel";

export default function Bonds() {
  const handleInputChange = useCallback((e) => {
    // const toShow = allBonds.filter((bond) => {
    //   return (
    //     bond.full_name.includes(e.target.value) ||
    //     bond.name.includes(e.target.value) ||
    //     bond.name.includes(e.target.value)
    //   );
    // });
  });

  return (
    <div style={{ overflowX: "hidden" }}>
      <NavBar />
      <div>
        <BondSearchPanel />
      </div>
      <div>
        <BondsSortedPanel />
      </div>

      <footer>Copyright © 2021. All Rights Reserved.</footer>
    </div>
  );
}
