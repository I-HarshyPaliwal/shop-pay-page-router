/* eslint-disable @next/next/no-img-element */
import styles from './styles.module.scss'

import { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay } from 'swiper/modules';
export default function ProductSwiper({ images }) {
    // console.log(images)
    const swiperRef = useRef(null);
    useEffect(() => {
        swiperRef.current.swiper.autoplay.stop();
    }, [swiperRef]);

    return (
        <div
            className={styles.swiper}
            onMouseEnter={() => {
                swiperRef.current.swiper.autoplay.start();
            }}
            onMouseLeave={() => {
                swiperRef.current.swiper.autoplay.stop();
                swiperRef.current.swiper.slideTo(0);
            }}
            Mouse
        >
            <Swiper
                ref={swiperRef}
                centeredSlides={true}
                autoplay={{ delay: 500, stopOnLastSlide: false }}
                speed={500}
                modules={[Autoplay]}
            >
                {
                    images?.map((img, i) => (
                        <SwiperSlide key={i}>
                            <img src={img.url} alt="" />
                        </SwiperSlide>
                    ))

                }

            </Swiper>
        </div>
    )
}
