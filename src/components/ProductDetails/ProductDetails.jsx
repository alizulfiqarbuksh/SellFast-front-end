import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router'
import * as productService from '../../services/productService'
import axios from 'axios'

import styles from '../ProductDetails/ProductDetails.module.css';

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
  <div className={styles.container}>
    <h1>Product Details</h1>

    <div className={styles.detailWrapper}>

      {product.image && (
        <div className={styles.imageWrapper}>
          <img
            src={product.image}
            alt="Uploaded preview"
            className={styles.productImage}
          />
        </div>
      )}

      <div className={styles.infoWrapper}>
        <h3>Name: {product.name}</h3>
        <h4>Description: {product.description}</h4>
        <p>Price: ${product.price}</p>

        {user && user.is_admin && (
        <div className={styles.adminActions}>
          <button
            className={styles.detailButton} // use scoped class ONLY
            onClick={() => navigate(`/products/${product.id}/update`)}
          >
            Update
          </button>
          <button
            className={styles.detailButton} // use scoped class ONLY
            onClick={() => handleDelete(product.id)}
          >
            Delete
          </button>
        </div>
      )}

      </div>

    </div>
  </div>
)

}

export default ProductDetails