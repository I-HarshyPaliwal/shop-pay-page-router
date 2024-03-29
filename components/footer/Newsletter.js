import Link from "next/link";
import styles from "./styles.module.scss";

export default function Newsletter() {
  return (
    <div className={styles.footer__newsletter}>
      <h3>
        Sign Up for our Newsletter
        <div className={styles.footer__flex}>
          <input type="text" placeholder="Your Email Address" />
          <button className={styles.btn_primary}>
            Subscribe to our Newsletter
          </button>
        </div>
        <p>
          By clicking the SUBSCRIBE button, you are agreeing to{" "}
          <Link href="">our Privacy & Cookie Policy</Link>
        </p>
      </h3>
    </div>
  );
}
