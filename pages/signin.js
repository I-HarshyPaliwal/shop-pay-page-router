/* eslint-disable react-hooks/rules-of-hooks */
import Footer from "@/components/footer";
import Header from "@/components/header";
import React, { useState } from "react";
import styles from "@/styles/signin.module.scss";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import LoginInput from "@/components/inputs/logininput";
import CircledIconButton from "@/components/buttons/circledIconButton";
import { getProviders, signIn } from "next-auth/react";

const initialValue = {
  login_email: "",
  login_password: "",
};

export default function signin({ providers }) {
  const [user, setUser] = useState(initialValue);
  const { login_email, login_password } = user;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  console.log(user);
  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required("Email Address is required")
      .email("Please enter a valid email address"),
    login_password: Yup.string().required("Please Enter a password"),
  });

  return (
    <>
      <Header country={{ name: "India", flag: "https://flagcdn.com/in.svg" }} />
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              We would be happy if join us !<Link href="/"> Go Store </Link>
            </span>
          </div>
          <div className={styles.login__form}>
            <h1>
              Sign In
            </h1>
            <p>Get Access to one of the best Eshopping services in the world</p>
            <Formik
              enableReinitialize
              initialValues={{
                login_email,
                login_password,
              }}
              validationSchema={loginValidation}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    type="email"
                    name="login_email"
                    icon="email"
                    placeholder="Email"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="login_password"
                    icon="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <CircledIconButton type='submit' text='Sign In' />
                  <div className={styles.forgot}>
                    <Link href='/forgot'>Forgot password ?</Link>
                  </div>
                </Form>
              )}
            </Formik>
            <div className={styles.login__socials}>
              <span className={styles.or}>
                or continue with
              </span>
              <div className={styles.login__socials__wrap}>
                {
                  providers.map((provider) => (
                    <div key={provider.name}>
                      <button
                        className={styles.social__btn}
                        onClick={() => signIn(provider.id)}
                      >
                        <img src={`../../icons/${provider.name}.png`} alt="" />
                        Sign in with {provider.name}
                      </button>
                    </div>
                  ))
                }
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer country={{ name: "India", flag: "https://flagcdn.com/in.svg" }} />
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = Object.values(await getProviders());
  return {
    props: { providers },
  };
}
