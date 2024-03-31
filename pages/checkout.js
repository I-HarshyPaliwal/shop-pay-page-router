import { getSession } from 'next-auth/react'
import styles from '../styles/checkout.module.scss'
import User from '@/models/User';
import Cart from '@/models/Cart';
import db from '@/utils/db';
import Header from '@/components/cart/header';
import Shipping from '@/components/checkout/shipping';
import { useEffect, useState } from 'react';

export default function Checkout({ cart, user }) {
    const [addresses, setAddresses] = useState(user?.address || []);
    const [selectedAddress, setSelectedAddress] = useState();
    useEffect(() => {

        let check = addresses.find((address) => address.active == true)
        if (check) {
            setSelectedAddress(check)
        }
    }, [addresses])


    return (
        <>
            <Header />
            <div className={`${styles.container} ${styles.checkout}`}>
                <div className={styles.checkout__side}>
                    <Shipping
                        selectedAddress={selectedAddress}
                        setSelectedAddress={setSelectedAddress}
                        user={user}
                        addresses={addresses}
                        setAddresses={setAddresses}
                    />
                </div>
                <div className={styles.checkout__side}></div>
            </div>
        </>
    )
}


export async function getServerSideProps(context) {
    db.connectDb();
    const session = await getSession(context);
    // console.log("Session", session)
    // Session doesn't contain id anymore

    const user = await User.findOne({ email: session.user.email })
    // console.log(user);
    // It returns an object from database

    const cart = await Cart.findOne({ user: user._id })
    // console.log("cart", cart);
    // This gets the user cart from the database

    db.disConnectDb();
    // All the database work has been done and we don't need the connection to database anymore in this function

    if (!cart) {
        return {
            redirect: {
                destination: "/cart",
            }
            // This will redirect user to cart page because cart is empty and there is nothing available to pay for on checkout page
        }
    }

    return {
        props: {
            cart: JSON.parse(JSON.stringify(cart)),
            user: JSON.parse(JSON.stringify(user)),
        },
    }
}