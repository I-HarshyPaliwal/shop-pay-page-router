/* eslint-disable @next/next/no-img-element */
import { BsArrowRightCircle } from 'react-icons/bs'
import styles from './styles.module.scss'

export default function Category({ header, products, background }) {
    return (
        <div className={styles.category} style={{ background: `${background}` }}>
            <div className={styles.category__header}>
                <h1>{header}</h1>
                <BsArrowRightCircle />
            </div>
            <div className={styles.category__products}>
                {products.map((product, i) => (
                    <div className={styles.product} key={i}>

                        <img src={product.image} alt="" />
                    </div>
                ))}
            </div>
        </div>
    )
}