/* eslint-disable @next/next/no-img-element */
import styles from './styles.module.scss'

// Swiperjs imports
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';

export default function ProductsSwiper({ header, products }) {
    return (
        <div className={styles.wrapper}>
            {header && <div className={styles.header}>{header}</div>}
            <Swiper
                slidesPerView={6}
                spaceBetween={10}
                navigation={true}
                modules={[Navigation]}
                className="products__swiper"
                breakpoints={{
                    250: {
                        slidesPerView: 2,
                    },
                    630: {
                        slidesPerView: 3,
                    },
                    920: {
                        slidesPerView: 4,
                    },
                    1232: {
                        slidesPerView: 5,
                    },
                    1520: {
                        slidesPerView: 6,
                    },
                }}
            >
                {
                    products.map((product, i) => (
                        <SwiperSlide key={i}>
                            <div className={styles.product}>
                                <div className={styles.product__img}>
                                    <img src={product.image} alt="" />

                                </div>
                                <div className={styles.product__infos}>
                                    <h1>{product.name.length > 25 ?
                                        `${product.name.slice(0, 25)}...` : product.name}</h1>
                                    {
                                        product.price && <span>${product.price} USD</span>
                                    }

                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }


            </Swiper>
        </div>
    )
}