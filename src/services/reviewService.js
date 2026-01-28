import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {}
}

const show = async (productId) => {
  try{

    const response = await axios.get(`${BASE_URL}/products/${productId}/reviews`)
    return response.data

  } catch (error) {
    console.log(error)
  }
}


const details = async (reviewId) => {
    
  try{

    const response = await axios.get(`${BASE_URL}/reviews/${reviewId}`)
    return response.data

  } catch (error) {
    console.log(error)
  }


}

const reviewStatShow = async (product_id) =>{
  try{

    const response = await axios.get(`${BASE_URL}/products/${product_id}/reviews/stats`)
    return response.data

  } catch (error) {
    console.log(error)
  }

}

const create = async (productId, reviewData) => {
  try{

    const response = await axios.post(`${BASE_URL}/products/${productId}/reviews`, reviewData,
       {headers: getAuthHeader()}
      )
       return response.data 

  }catch(error){
    console.log(error)
  }
}

const update = async (reviewId, reviewData) => {
  try{
   
    const response = await axios.put(`${BASE_URL}/reviews/${reviewId}`, reviewData, 
       {headers: getAuthHeader()}
    )
   
   return response.data

  }catch(error){
    console.log(error)
  }
}

const deleteOne = async(reviewId) => {
  try{
     
     const response = await axios.delete(`${BASE_URL}/reviews/${reviewId}`, {headers: getAuthHeader()} )
     return response.data

  }catch(error){

     console.log(error)
  }
}



export{
  show,
  reviewStatShow,
  details,
  create,
  update,
  deleteOne

}