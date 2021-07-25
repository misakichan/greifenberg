import styles from "../styles/components/NewsRelated.module.css";
import { NewsCard } from "./NewsCard";

export const NewsPanel = ({ news }) => {
  return (
    <div className={styles.news_container}>
      <h1>Latest News</h1>
      <div>
        {news.map((newsItem, idx) => {
          return <NewsCard {...newsItem} key={idx} />;
        })}
      </div>
    </div>
  );
};
