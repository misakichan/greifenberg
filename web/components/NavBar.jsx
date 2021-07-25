import styles from "../styles/components/NavBar.module.css";
import Link from "next/link";
import { Logo } from "./Logo";

export const NavBar = () => {
  return (
    <div className={styles.navbar}>
      <div>
        <Logo />
      </div>
      <div className={styles.navbar_tabs}>
        <Link className={styles.navbar_tab} href='/'>
          HOME
        </Link>
        <Link className={styles.navbar_tab} href='/about'>
          ABOUT
        </Link>
        <Link className={styles.navbar_tab} href='/contact'>
          CONTACT US
        </Link>
        <Link className={styles.navbar_tab} href='/bonds'>
          BONDS
        </Link>
      </div>
    </div>
  );
};
