import { MdFlashOn } from 'react-icons/md'
import styles from './styles.module.scss'
import CountDown from '@/components/countdown'

// Swiper js import
import React, { useState } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Navigation } from 'swiper/modules';
import { flashDealsArray } from '@/data/home';
import FlashCard from './Card';

export default function FlashDeals() {
    return (
        <div className={styles.flashDeals}>
            <div className={styles.flashDeals__header}>
                <h1>
                    Flash Sale
                    <MdFlashOn />
                </h1>
                <CountDown date={new Date(2024, 3, 19)} />
            </div>
            <Swiper
                slidesPerView={5}
                spaceBetween={20}
                navigation={true}
                modules={[Navigation]}
                className="flashDeals__swiper"
            >
                <div className={styles.flashDeals__list}>
                    {flashDealsArray.map((product, i) => (
                        <SwiperSlide key={i}>
                            <FlashCard product={product} />
                        </SwiperSlide>
                    ))}
                </div>


            </Swiper>
        </div>
    )
}
