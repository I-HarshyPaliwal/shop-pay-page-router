import axios from "axios";

export const saveCart = async (cart) => {
  try {
    const { data } = await axios.post("/api/user/saveCart", {
      cart,
      // user_email,
    });
    return data;
  } catch (error) {
    return error.data.message;
    // return response.error.data.message;
  }
};

export const saveAddress = async (address) => {
  try {
    // console.log("Address", address);
    // console.log("UserId", userId);
    const { data } = await axios.post("/api/user/saveAddress", {
      address,
      // userId,
    });
    console.log("Data", data);
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const changeActiveAddress = async (id) => {
  try {
    const { data } = await axios.put("/api/user/manageAddress", {
      id,
    });

    // const res = await axios.put("/api/user/manageAddress", {
    //   id,
    // });
    // Here Data field is empty string
    // console.log("Data", res);
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
export const deleteAddress = async (id) => {
  try {
    const { data } = await axios.delete("/api/user/manageAddress", {
      data: { id },
    });
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
export const applyCoupon = async (coupon) => {
  const { data } = await axios.post("/api/user/applyCoupon", {
    coupon,
  });
  return data;
};
