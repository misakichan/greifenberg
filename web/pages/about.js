import { NavBar } from "../components/NavBar";
import styles from "../styles/pages/About.module.css";

export default function About() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <NavBar />
      <div>
        <div className={styles.banner_img}>
          <img src='/bg-9.jpg' alt='bg-9' />
        </div>
        <div className={styles.banner_img_filter}></div>
        <p className={styles.about_us}>About Us</p>
      </div>
      <main className={styles.main_content}>
        <p>COMPANY OVERVIEW</p>​
        <p>
          Welcome to <span>Greifenberg</span>
        </p>
        <div>
          <p>
            In the current super low-rate environment, hunting for decent yield
            with accurately measured risk is actively pursued by investors
            around the world. China presented an attractive opportunity.
            Approximately 5,300 onshore Chinese corporate bonds are priced
            electronically on stock exchanges or through dealer trading
            platforms. A histogram of bond yields is shown in the chart below.
          </p>
          <p>
            Foreign interest in Chinese bonds has been restricted to the left
            hand of the distribution, where bonds of large corporations yield 3%
            to 4%. But there is an enormous investible universe of bonds
            yielding 6% to 8%. Because Chinese official credit ratings are
            meaningless and foreign investors have difficulty assessing credit
            risk, Western investors largely have ignored the right hand of the
            distribution.
          </p>
          <p>
            China’s corporate bond market provides the largest share of marginal
            yield to the global corporate bond market, but risks abound, and
            analytical tools are limited. Greifenberg Capital in alliance with
            BBD, a Chengdu-based big data firm—whose proprietary “business
            ecological“ model for credit risk has won industry accolade, with
            rating license granted by Chinese regulator—will offer an unique
            analytic suite for risk analysis of Chinese corporate bonds , using
            public and implied data that otherwise unavailable in the West. The
            Greifenberg team is led by seasoned industry professionals with a
            stellar record in quantitative credit analysis. The analytics
            developed by Greifenberg will be complementary to BBD’s key
            analytical components, such as credit rating and fraud indicators,
            using internally developed model (based on published work by key
            staff members) to cross corroborate the champion model. We
            redressing the deficiency of the formally reported data in term of
            timeliness and reliability by incorporating non-traditional data
            such as scrapped from the web/social media into the risk assessment.
          </p>
        </div>
      </main>
      <div className={styles.outtro}>
        <img src='/bg-11.jpg' alt='bg-11' />
        <div className={styles.outtro_content_bg}></div>
        <div className={styles.outtro_content}>
          <div>
            <h4>Value Proposition</h4>
            <p>
              We make it easy for you to hunt the superior yield in a
              treacherous market by measuring the risk judiciously and reliably.
            </p>
          </div>
          <div>
            <h4>Mission Statement</h4>
            <p>
              Our mission is to help investors, particularly those at oversea
              navigate the arcane bond market in China, thus creating
              risk-adjusted yield for clients while enhancing market efficiency
              and transparency in the mean time
            </p>
          </div>
        </div>
      </div>
      <footer>Copyright © 2021. All Rights Reserved.</footer>
    </div>
  );
}
