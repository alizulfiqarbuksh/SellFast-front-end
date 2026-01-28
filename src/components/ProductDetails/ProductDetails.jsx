import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router'
import * as productService from '../../services/productService'
import * as cartitemService from '../../services/cartitemService'
import axios from 'axios'

import styles from '../ProductDetails/ProductDetails.module.css';

function ProductDetails({user}) {

  const [product, setProduct] = useState(null)
  const {id} = useParams()
  const [cartItems, setCartItems] = useState([])

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

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!user) return
      try {
        const items = await cartitemService.getCartItems(user.cartId)
        setCartItems(items)
      } catch (error) {
        console.log(error)
      }
    }
    fetchCartItems()
  }, [user])

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

  const isInCart = (productId) => {
    return cartItems.some(item => item.product_id === productId)
  }

  const handleAddToCart = async (productId) => {
    if (!user) {
      alert('You must be signed in to add items to cart')
      return
    }

    try {
      const newItem = await cartitemService.createCartItem(user.cartId, { product_id: productId, quantity: 1 })
      setCartItems(prev => [...prev, newItem])
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

        {/* Add to Cart button for normal users */}
        {product.is_available && !user?.is_admin && (
          <button
            onClick={() => handleAddToCart(product.id)}
            disabled={isInCart(product.id)}
            style={{ marginTop: '1rem' }}
          >
            {isInCart(product.id) ? 'Already in Cart' : 'Add to Cart'}
          </button>
        )}


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