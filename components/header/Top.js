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
import { useSession } from "next-auth/react";

export default function Top({country}) {
  const { data: session } = useSession();
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
            {session ? (
              <li className={styles.li}>
                <div className={styles.flex}>
                  <img
                    src={session.user.image}
                    alt=""
                  />
                  <span>{session.user.name}</span>
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
            {visible && <UserMenu session={session} />}
          </li>
        </ul>
      </div>
    </div>
  );
}
