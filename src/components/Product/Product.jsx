import React, { useEffect, useState } from 'react'
import * as productService from '../../services/productService'
import { useNavigate } from 'react-router'
import * as cartitemService from '../../services/cartitemService'

import styles from '../Product/Product.module.css';

function Product({user}) {

  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [cartItems, setCartItems] = useState([])

  const navigate = useNavigate()

  useEffect(() => {

    const getProducts = async () => {
      try {
        
        const products = await productService.show()
        setProducts(products)

      } catch (error) {
        console.log(error)
      }
    }

    getProducts()

  }, [])

  // Fetch user's cart items
  useEffect(() => {
    const getCartItems = async () => {
      if (!user?.cartId || isNaN(user.cartId)) return;
      if (!user) return
      try {
        const items = await cartitemService.getCartItems(user.cartId)
        setCartItems(items)
      } catch (error) {
        console.log(error)
      }
    }
    getCartItems()
  }, [user])

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )


  // Check if a product is already in cart
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
      // Update local state so the UI updates immediately
      setCartItems(prev => [...prev, newItem])
    } catch (error) {
      console.log(error)
    }
  }

  return (
  <div className={styles.container}>
    <h1>Products</h1>

    <input
      type="text"
      placeholder="Search products..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className={styles.searchInput}
      style={{ marginBottom: '1rem' }}
    />

    <div className={styles.productList}>
      {
        filteredProducts.map((product) =>
          <div key={product.id} className={styles.productCard}>

            {product.image && (
              <img
                src={product.image}
                alt="Uploaded preview"
                className={styles.productImage}
              />
            )}

            <h3>Name: {product.name}</h3>
            <h4>Price: {product.price}</h4>
            <h4>Stock: {product.stock}</h4>

            <div className={styles.actions}>
              {product.is_available
                ? <button onClick={() => {navigate(`/products/${product.id}`)}}>Details</button>
                : "Not Available"}

              {user?.is_admin && !product.is_available
                ? <button onClick={() => {navigate(`/products/${product.id}`)}}>Details</button>
                : ""}

              {product.is_available && !user?.is_admin && (
                <button
                  onClick={() => handleAddToCart(product.id)}
                  disabled={isInCart(product.id) || product.stock === 0}
                  style={{ marginLeft: '1rem' }}
                >
                  {product.stock === 0 ? 'Out of Stock' : isInCart(product.id) ? 'Already in Cart' : 'Add to Cart'}
                </button>
              )}
            </div>

          </div>
        )
      }
    </div>
  </div>
)
}

export default Product