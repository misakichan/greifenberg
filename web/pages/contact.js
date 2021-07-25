import { NavBar } from "../components/NavBar";
import DropLine from "../components/DropLine";
import contactStyles from "../styles/pages/Contact.module.css";
import aboutStyles from "../styles/pages/About.module.css";

export default function Contact() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <NavBar />
      <div>
        <div className={aboutStyles.banner_img}>
          <img src='/bg-9.jpg' alt='bg-9' />
        </div>
        <div className={aboutStyles.banner_img_filter}></div>
        <p className={aboutStyles.about_us}>Contact</p>
      </div>
      <div className={contactStyles.contact_info}>
        <h1>
          How can <span>We Help You</span> out? Reach out to us in the nearest
          office.
        </h1>
        <div className={contactStyles.contact_cards}>
          <div className={contactStyles.card}>
            <p>Address</p>
            <p>
              Express Chambers II Spaces Works, 3 Wakehurst Street New York, NY
              10002
            </p>
          </div>
          <div className={contactStyles.card}>
            <p>Email</p>
            <a href='help@branddeothemes.com'>help@branddeothemes.com</a>
            <a href='atara@deothemes.com'>atara@deothemes.com</a>
          </div>
          <div className={contactStyles.card}>
            <p>Phone</p>
            <a href='tel:+1-1803-555-0133'>+1-1803-555-0133</a>
            <a href='tel:+1-1800-256-5857'>+1-1800-256-5857</a>
          </div>
        </div>
      </div>
      <div className={contactStyles.outtro}>
        <div className={contactStyles.outtro_content_bg}></div>
        <div className={contactStyles.outtro_map}>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12090.147595329823!2d-74.0182606!3d40.75021460000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2z5bid5Zu95aSn5Y6m!5e0!3m2!1szh-CN!2sus!4v1626553099830!5m2!1szh-CN!2sus'
            width='800'
            height='800'
            loading='lazy'></iframe>
        </div>
      </div>
      <div className={contactStyles.dropline}>
        <DropLine />
      </div>
      <footer>Copyright © 2021. All Rights Reserved.</footer>
    </div>
  );
}
