/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Empty from "@/components/cart/empty";
import Header from "@/components/cart/header";
import styles from '../styles/cart.module.scss'
import { useDispatch, useSelector } from "react-redux";
import Product from "@/components/cart/product";
import CartHeader from "@/components/cart/cartHeader";
import Checkout from "@/components/cart/checkout";
import { useEffect, useState } from "react";
import PaymentMethods from "@/components/cart/paymentMethods";

export default function cart() {
    const dispatch = useDispatch();
    // Global State
    const { cart } = useSelector((state) => ({ ...state }))

    // Local States
    const [selected, setSelected] = useState([])
    const [shipping, setShipping] = useState(0)
    const [subtotal, setSubtotal] = useState(0)
    const [total, setTotal] = useState(0)

    // useEffect Hook
    useEffect(() => {
        setShipping(selected.reduce((a, c) => a + Number(c.shipping), 0).toFixed(2));
        setSubtotal(selected.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2));
        setTotal((selected.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2) + Number(shipping)));
    }, [selected])



    // console.log("Selected", selected)
    return (
        <>
            <Header />
            <div className={styles.cart}>
                {cart.cartItems.length > 0 ? (
                    <div className={styles.cart__container}>

                        <CartHeader
                            cartItems={cart.cartItems}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <div className={styles.cart__products}>
                            {cart.cartItems?.map((product) => (
                                <Product product={product} key={product._uid}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            ))}
                        </div>
                        <Checkout
                            subtotal={subtotal}
                            shippingFee={shipping}
                            total={total}
                            selected={selected}
                        />
                        <PaymentMethods />
                    </div>
                ) : (<Empty />)}
            </div>
        </>
    )
}
