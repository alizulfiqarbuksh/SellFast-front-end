import React, { useEffect, useState } from 'react'
import * as productService from '../../services/productService'
import { useNavigate } from 'react-router'

function Product({user}) {

  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

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

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h1>Product</h1>

      <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ marginBottom: '1rem' }} />

      <div>
        {
          filteredProducts.map((product) =>
            <div key={product.id}>
              {product.image && <img src={product.image} alt="Uploaded preview" style={{ width: '300px' }} />}
              <h3>Name: {product.name}</h3>
              <h4>Price: {product.price}</h4>
              <h4>Stock: {product.stock}</h4>
              {product.is_available ? <button onClick={() => {navigate(`/products/${product.id}`)}}>Details</button> : "Not Available"}
              {user.is_admin && !product.is_available ? <button onClick={() => {navigate(`/products/${product.id}`)}}>Details</button> : ""}
            </div>
          )
        }
      </div>
    </div>
    
  )
}

export default Product