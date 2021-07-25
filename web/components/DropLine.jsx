import styles from "../styles/components/DropLine.module.css";
import { useCallback } from "react";

export default function DropLine() {
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    alert("Submmit success");
  }, []);

  return (
    <>
      <h3 className={styles.dropline_h}>Drop us a line </h3>
      <p>
        Contact us today and get a free trial plan to give a new start to your
        business, or a personal website!
      </p>
      <form onSubmit={handleSubmit} className={styles.dropline_form}>
        <div>
          <label htmlFor='name'>NAME</label>
          <input type='text' placeholder='Kevin Hart' id='name'></input>
        </div>

        <div>
          <label htmlFor='email'>EMAIL</label>
          <input
            id='email'
            type='email'
            placeholder='example@gmail.com'></input>
        </div>
        <div>
          <label htmlFor='message'>MESSAGE</label>
          <textarea
            id='message'
            type='text'
            placeholder='Typing here to leave us a message'></textarea>
        </div>
        <button onClick={handleSubmit}>SEND MESSAGE</button>
      </form>
    </>
  );
}
