import styles from "../styles/components/NewsRelated.module.css";

export const NewsCard = ({ title, createdDate }) => {
  return (
    <div className={styles.news_card}>
      <h3>{title}</h3>
      <p>READ MORE</p>
      <time>{createdDate}</time>
    </div>
  );
};
