import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/orders`

const show = async () => {
  try {

    const response = await axios.get(BASE_URL)
    return response.data
    
  } catch (error) {
    console.log(error)
  }
}

const create = async (orderData) => {
  try {
    const response = await axios.post(BASE_URL, orderData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}` // or wherever you store JWT
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
    const response = await axios.get(`${BASE_URL}/${id}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export{
  show,
  create,
  getOne
}