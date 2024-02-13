import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home({country}) {
  return (
    <>
      <Header country={country}/>
      <Footer country={country} />
    </>
  );
}

export async function getServerSideProps(){
  // const data = await axios.get('https://api.ipregistry.co/?key=xycrvtfufugeje3j'
  // ).then((res) => {
  //   return res.data.location.country;
  // }).catch((err) => {
  //   console.log(err)
  // });

  return {
    props: {
      // country: {name : data.name , flag: data.flag.emojitwo},
      country: {name : "India" , flag: "https://flagcdn.com/in.svg"},
    }
  }
}