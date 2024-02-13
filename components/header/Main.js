/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import styles from "./styles.module.scss";
import { RiSearchLine } from "react-icons/ri";
import { FaOpencart } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Main() {
  const { cart } = useSelector((state) => ({ ...state }));

  return (
    <div className={styles.main}>
      <div className={styles.main__container}>
        <Link href="/">
          <div className={styles.logo}>
            <img src="../../../logo.png" alt="" />
            {/* '@/address' doesn't work with this */}
          </div>
        </Link>
        <div className={styles.search}>
          <input type="text" name="" id="" placeholder="Search..." />
          <div className={styles.search__icon}>
            <RiSearchLine />
          </div>
        </div>
        <Link href="/">
          <div className={styles.cart}>
            <FaOpencart />
            <span>{cart.length}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
