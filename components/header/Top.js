/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import styles from "./styles.module.scss";
import { SiSpringsecurity } from "react-icons/si";
import { CiHeart } from "react-icons/ci";
import { RiCustomerService2Line } from "react-icons/ri";
import { RiAccountPinCircleLine, RiArrowDropDownFill } from "react-icons/ri";
import { IoHelp } from "react-icons/io5";
import Link from "next/link";
import { useState } from "react";
import UserMenu from "./UserMenu";

export default function Top({country}) {
  const [loggedIn, setLoggedIn] = useState(true);
  const [visible, setVisible] = useState(false);
  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div></div>
        <ul className={styles.top__list}>
          <li className={styles.li}>
            <img src={country.flag} alt="Indian Flag" />
            <span>{country.name}</span>
          </li>
          <li className={styles.li}>
            <SiSpringsecurity />
            <span>Buyer Protection </span>
          </li>
          <li className={styles.li}>
            <RiCustomerService2Line />
            <span>Customer Service</span>
          </li>
          <li className={styles.li}>
            <IoHelp />
            <span>Help</span>
          </li>
          <li className={styles.li}>
            <CiHeart />
            <Link href="/profile/wishlist">
              <span>Wishlist</span>
            </Link>
          </li>
          <li
            className={styles.li}
            onMouseOver={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
          >
            {loggedIn ? (
              <li className={styles.li}>
                <div className={styles.flex}>
                  <img
                    src="https://cdn.dribbble.com/users/6104671/screenshots/14274019/media/2acc50ba9f18dcb497ca845314007549.jpg?resize=400x300&vertical=center"
                    alt=""
                  />
                  <span>Harsh Paliwal</span>
                  <RiArrowDropDownFill />
                </div>
              </li>
            ) : (
              <li className={styles.li}>
                <div className={styles.flex}>
                  <RiAccountPinCircleLine />
                  <span>Account</span>
                  <RiArrowDropDownFill />
                </div>
              </li>
            )}
            {visible && <UserMenu loggedIn={loggedIn} />}
          </li>
        </ul>
      </div>
    </div>
  );
}
