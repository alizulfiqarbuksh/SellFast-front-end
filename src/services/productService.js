import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/products`

const show = async () => {
  try {

    const response = await axios.get(BASE_URL)
    return response.data
    
  } catch (error) {
    console.log(error)
  }
}

const details = async (id) => {
  try {

    const response = await axios.get(`${BASE_URL}/${id}`)
    return response.data
    
  } catch (error) {
    console.log(error)
  }
}

const deleteOne = async (id) => {
  try{
    const token = localStorage.getItem('token')
    const response = await axios.delete(`${BASE_URL}/${id}`, {headers: {Authorization: `Bearer ${token}`}})
    return response.data
  } catch(error){
    console.log(error)
  }
}

const create = async (product) => {
  try {

    const token = localStorage.getItem('token')
    const response = await axios.post(BASE_URL, product, {headers: {Authorization: `Bearer ${token}`}})
    return response.data
    
  } catch (error) {
    console.log(error)
  }
}

const update = async (id, product) => {
  try {

    const token = localStorage.getItem('token')
    const response = await axios.put(`${BASE_URL}/${id}`, product, {headers: {Authorization: `Bearer ${token}`}})
    return response.data
    
  } catch (error) {
    console.log(error)
  }
}

export{
  show,
  details,
  deleteOne,
  create,
  update
}