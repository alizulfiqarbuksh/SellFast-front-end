import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/orders`

const show = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

const create = async (orderData) => {
  try {
    const response = await axios.post(BASE_URL, orderData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

const getOne = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export{
  show,
  create,
  getOne
}