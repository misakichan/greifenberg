import styles from "../styles/components/Logo.module.css";

export const Logo = () => {
  return (
    <div className={styles.logo_container}>
      <span className={styles.logo_container_span}>GREIFEN</span>
      <span className={styles.logo_container_span}>BERG</span>
    </div>
  );
};
