/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import styles from './styles.module.scss'
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import 'yup-phone';
import ShippingInput from '@/components/inputs/shippingInput';
import SingularSelect from '@/components/selects/SingularSelect';
import { countries } from '@/data/countries';
import { changeActiveAddress, deleteAddress, saveAddress } from '@/requests/user';
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { FaIdCard } from "react-icons/fa";
import { GiPhone } from "react-icons/gi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMdArrowDropupCircle } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";


const initialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    state: "",
    city: "",
    zipCode: "",
    address1: "",
    address2: "",
    country: "",
}

export default function Shipping({ selectedAddress, setSelectedAddress, user, addresses, setAddresses }) {
    // const [addresses, setAddresses] = useState(user?.address || []);
    // This state is uplifted to checkout page
    // console.log("Address", addresses)
    const [shipping, setShipping] = useState(initialValues);
    const [visible, setVisible] = useState(user?.address.length ? false : true);

    // console.log("User", user);


    const { firstName,
        lastName,
        phoneNumber,
        state,
        city,
        zipCode,
        address1,
        address2,
        country } = shipping;

    const validate = Yup.object({
        firstName: Yup.string()
            .required("First Name is required")
            .min(3, "First name must be atleast 3 characters long")
            .max(20, "First Name must be less than 20 words"),

        lastName: Yup.string()
            .required("Last Name is required")
            .min(3, "Last name must be atleast 3 characters long")
            .max(20, "Last Name must be less than 20 words"),


        phoneNumber: Yup.string()
            .required("Phone Number is required")
            .phone()
            .min(3, "Phone Number must be atleast 3 characters long")
            .max(30, "Phone Number must be less than 30 words"),

        state: Yup.string()
            .required("State name is required.")
            .min(2, "State name should contain 2-60 characters..")
            .max(60, "State name should contain 2-60 characters."),

        city: Yup.string()
            .required("City name is required.")
            .min(2, "City name should contain 2-60 characters.")
            .max(60, "City name should contain 2-60 characters."),

        zipCode: Yup.string()
            .required("ZipCode/Postal is required.")
            .min(2, "ZipCode/Postal should contain 2-30 characters..")
            .max(30, "ZipCode/Postal should contain 2-30 characters."),

        address1: Yup.string()
            .required("Address Line 1 is required.")
            .min(5, "Address Line 1 should contain 5-100 characters.")
            .max(100, "Address Line 1 should contain 5-100 characters."),

        address2: Yup.string()
            .min(5, "Address Line 2 should contain 5-100 characters.")
            .max(100, "Address Line 2 should contain 5-100 characters."),

        country: Yup.string().required("Country name is required."),


    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShipping({ ...shipping, [name]: value })
    }

    const saveShippingHandler = async () => {
        const res = await saveAddress(shipping);
        setAddresses(res.address);
        setSelectedAddress(res.address);
    };

    const changeActiveHandler = async (id) => {
        const res = await changeActiveAddress(id);
        console.log("Response ", res)
        setAddresses(res.addresses);
    };
    const deleteHandler = async (id) => {
        const res = await deleteAddress(id);
        setAddresses(res.addresses);
    };

    return (
        <div className={styles.shipping}>
            <div className={styles.addresses}>
                {addresses?.map((address) => (
                    <div style={{ position: "relative" }} key={address._id}>
                        <div
                            className={styles.address__delete}
                            onClick={() => deleteHandler(address._id)}
                        >
                            <IoIosRemoveCircleOutline />
                        </div>
                        <div
                            className={`${styles.address} ${address.active && styles.active}`}
                            key={address._id}
                            onClick={() => changeActiveHandler(address._id)}
                        >
                            <div className={styles.address__side}>
                                <img src={user.image} alt="" />
                            </div>
                            <div className={styles.address__col}>
                                <span>
                                    <FaIdCard />
                                    {/* {console.log(address.firstName.toUpperCase())} */}
                                    {address.firstName.toUpperCase()}{" "}
                                    {address.lastName.toUpperCase()}
                                </span>
                                <span>
                                    <GiPhone />
                                    {address.phoneNumber}
                                </span>
                            </div>
                            <div className={styles.address__col}>
                                <span>
                                    <FaMapMarkerAlt />
                                    {address.address1}
                                </span>
                                <span>{address.address2}</span>
                                <span>
                                    {address.city},{address.state},{address.country}
                                </span>
                                <span>{address.zipCode}</span>
                            </div>
                            <span
                                className={styles.active__text}
                                style={{
                                    display: `${!address.active && "none"}`,
                                }}
                            >
                                Active
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <button className={styles.hide_show} onClick={() => setVisible(!visible)}>
                {visible ? (
                    <span>
                        <IoMdArrowDropupCircle style={{ fontSize: "2rem", fill: "#222" }} />
                    </span>
                ) : (
                    <span>
                        ADD NEW ADDRESS <AiOutlinePlus />
                    </span>
                )}
            </button>

            {visible && (
                <Formik
                    enableReinitialize
                    initialValues={
                        {
                            firstName,
                            lastName,
                            phoneNumber,
                            state,
                            city,
                            zipCode,
                            address1,
                            address2,
                            country
                        }
                    }
                    validationSchema={validate}
                    onSubmit={() => {
                        saveShippingHandler();
                    }}
                >
                    {
                        (formik) => (
                            <Form>
                                <SingularSelect
                                    name="country"
                                    value={country}
                                    placeholder="*Country"
                                    handleChange={handleChange}
                                    data={countries}
                                />

                                <div className={styles.col}>
                                    <ShippingInput
                                        name="firstName"
                                        placeholder="First Name"
                                        onChange={handleChange}
                                    />
                                    <ShippingInput
                                        name="lastName"
                                        placeholder="Last Name"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className={styles.col}>
                                    <ShippingInput
                                        name="state"
                                        placeholder="*State/Province"
                                        onChange={handleChange}
                                    />
                                    <ShippingInput
                                        name="city"
                                        placeholder="*City"
                                        onChange={handleChange}
                                    />
                                </div>
                                <ShippingInput
                                    name="phoneNumber"
                                    placeholder="*Phone number"
                                    onChange={handleChange}
                                />
                                <ShippingInput
                                    name="zipCode"
                                    placeholder="*Post/Zip code"
                                    onChange={handleChange}
                                />
                                <ShippingInput
                                    name="address1"
                                    placeholder="Address 1"
                                    onChange={handleChange}
                                />
                                <ShippingInput
                                    name="address2"
                                    placeholder="Address 2"
                                    onChange={handleChange}
                                />
                                <button type="submit">Save Address</button>
                            </Form>
                        )
                    }
                </Formik>
            )}

        </div>
    )
}
