// Package Imports
import { useMediaQuery } from "react-responsive";
// NextJs Imports
import { Inter } from "next/font/google";

// -- ** --
// Local Imports 
import styles from "@/styles/Home.module.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";
import Main from "@/components/home/main";
import FlashDeals from "@/components/home/flashDeals";
import Category from "@/components/category";

// data folder imports
import { gamingSwiper, homeImprovSwiper, women_accessories, women_dresses, women_shoes, women_swiper } from "@/data/home";

import ProductsSwiper from "@/components/productsSwiper";

// Database Imports
import db from "@/utils/db";
import Product from "../models/Product";
import ProductCard from "@/components/productCard";

// -- ** --

const inter = Inter({ subsets: ["latin"] });

export default function Home({ country, products }) {
  // console.log(products)
  const { data: session } = useSession();
  const isMedium = useMediaQuery({ query: "(max-width: 850px)" })
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" })
  // console.log(session);
  return (
    <>
      <Header country={country} />
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
          <FlashDeals />
          <div className={styles.home__category}>
            <Category
              header='Dresses'
              products={women_dresses} background='#5a31f4' />
            {
              !isMedium &&
              <Category
                header='Shoes / High Heels'
                products={women_shoes} background='#3c811f' />
            }
            {
              isMobile &&
              <Category
                header='Shoes / High Heels'
                products={women_shoes} background='#3c811f' />
            }

            <Category
              header='Accessories'
              products={women_accessories} background='#000' />
          </div>
          <ProductsSwiper header='' products={women_swiper} />
          <ProductsSwiper
            header='For Gamers'
            products={gamingSwiper}
            bg='2f82ff'
          />
          <ProductsSwiper
            header='House Improvement'
            products={homeImprovSwiper}
            bg='5a31f4'
          />
          <div className={styles.products}>
            {products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </div>
      </div>
      <Footer country={country} />
    </>
  );
}

export async function getServerSideProps() {
  // This was used to fetch data to get country name , time , flag , weather and other stuff
  // const data = await axios.get('https://api.ipregistry.co/?key=xycrvtfufugeje3j'
  // ).then((res) => {
  //   return res.data.location.country;
  // }).catch((err) => {
  //   console.log(err)
  // });


  // This will create a connection to mongodb Database 
  db.connectDb();
  let products = await Product.find().sort({ createdAt: -1 }).lean();


  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      // country: {name : data.name , flag: data.flag.emojitwo},
      country: { name: "India", flag: "https://flagcdn.com/in.svg" },
    },
  };
}
