/* eslint-disable @next/next/no-img-element */
import styles from './styles.module.scss'

import { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

export default function MainSwiper() {
    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mainSwiper"
            >
                <SwiperSlide>
                    <img src="../../../images/swiper/1.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="../../../images/swiper/2.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="../../../images/swiper/3.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="../../../images/swiper/4.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="../../../images/swiper/5.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="../../../images/swiper/6.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="../../../images/swiper/7.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="../../../images/swiper/8.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="../../../images/swiper/9.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="../../../images/swiper/10.jpg" alt="" />
                </SwiperSlide>

            </Swiper>
        </>
    );
}

