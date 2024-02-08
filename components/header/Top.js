/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import styles from './styles.module.scss';
import { SiSpringsecurity } from "react-icons/si";
import { CiHeart } from "react-icons/ci";
import { RiCustomerService2Line } from "react-icons/ri";
import { RiAccountPinCircleLine , RiArrowDropDownFill } from "react-icons/ri";
import { IoHelp } from "react-icons/io5";
import Link from 'next/link';


export default function Top() {
  return (
    <div className={styles.top}>
        <div className={styles.top__container}>
            <div>

            </div>
            <ul className={styles.top__list}>
                <li>
                    <img  src="https://flagcdn.com/in.svg" alt="Indian Flag" />
                    <span>India</span>
                </li>
                <li>
                <SiSpringsecurity />
                   <span>Buyer Protection </span>
                </li>
                <li>
                <RiCustomerService2Line />
                    <span>Customer Service</span>
                </li>
                <li>
                <IoHelp />
                    <span>Help</span>
                </li>
                <li>
                <CiHeart />
                <Link href='/profile/wishlist'>
                    <span>Wishlist</span>
                </Link>
                </li>
                <li>
                    <div className={styles.flex}>
                    <RiAccountPinCircleLine />
                    <span>Account</span>
                    <RiArrowDropDownFill />
                    </div>
                </li>

            </ul>
        </div>
    </div>
  )
}
