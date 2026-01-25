import React, { useEffect, useState } from 'react'
import * as productService from '../../services/productService'
import { useNavigate } from 'react-router'

function Product() {

  const [products, setProducts] = useState([])

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

  return (
    <div>
      <h1>Product</h1>
      <div>
        {
          products.map((product) =>
            <div key={product.id}>
              <h3>Name: {product.name}</h3>
              <h4>Price: {product.price}</h4>
              <h4>Stock: {product.stock}</h4>
              <button onClick={() => {navigate(`/products/${product.id}`)}}>Details</button>
            </div>
          )
        }
      </div>
    </div>
    
  )
}

export default Product