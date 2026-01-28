import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router'
import * as productService from '../../services/productService'
import axios from 'axios'
import ReviewSection from '../Review/ReviewSection'

function ProductDetails({user}) {

  const [product, setProduct] = useState(null)
  const {id} = useParams()

  const navigate = useNavigate()

  useEffect(() => {
  
    const productDetails = async (id) => {
      try {

        const foundProduct = await productService.details(id)
        setProduct(foundProduct)
        
      } catch (error) {
        console.log(error)
      }
    }

    if (id) productDetails(id)

  }, [id])

  const handleDelete = async (id) => {

    try {

      const deletedProduct = await productService.deleteOne(id)

      if(deletedProduct) {
        navigate('/products')
      }

      
    } catch (error) {
      console.log(error)
    }

  }

  if (!product) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>ProductDetails</h1>
      <div>
        {product.image && <img src={product.image} alt="Uploaded preview" style={{ width: '300px' }} />}
        <h3>Name: {product.name}</h3>
        <h4>Description: {product.description}</h4>
        <p>price: {product.price}</p>
      </div>

      {user && user.is_admin && (
      <div>
        <button onClick={() => {navigate(`/products/${product.id}/update`)}}>Update</button>
        <button onClick={() => {handleDelete(product.id)}}>Delete</button>
      </div>
      
      )}
     
       {/* ========== REVIEWS (All logic handled by ReviewSection) ========== */}
         <ReviewSection productId={id} user={user} />

    </div>
  )
}

export default ProductDetails