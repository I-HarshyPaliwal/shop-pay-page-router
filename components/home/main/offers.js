/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import styles from './styles.module.scss'
import { offersArray } from '@/data/home';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import Link from 'next/link';

export default function Offers() {
    return (
        <div className={styles.offers}>
            <Swiper
                slidesPerView={3}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="offers__swiper"
            >
                {
                    offersArray.map((offer) => (
                        <SwiperSlide key={offer.image}>
                            <Link href="">
                                <img src={offer.image} alt='' />
                            </Link>
                            <span>${offer.price}</span>
                            <span>-{offer.discount}%</span>
                        </SwiperSlide>
                    ))
                }


            </Swiper>
        </div>
    );
}

