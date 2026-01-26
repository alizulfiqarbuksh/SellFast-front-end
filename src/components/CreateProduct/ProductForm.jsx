import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import * as productService from '../../services/productService'
import ImageUpload from '../ImageUpload/ImageUpload'

function ProductForm({user}) {

  const navigate = useNavigate()
  const {id} = useParams()

  const isEdit = Boolean(id)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    is_available: true,
    image: ""
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isEdit) {
      setLoading(false)
      return
    }

    const getProduct = async () => {
      try {
        const product = await productService.details(id)
        setFormData(product)
        setLoading(false)
      } catch (err) {
        console.log(err)
        navigate(`/products/${id}`, { replace: true })
      }
    }

    getProduct()

  },[id, isEdit, navigate])

  const handleSubmit = async (event) => {
  event.preventDefault()

  const payload = {...formData, price: Number(formData.price), stock: Number(formData.stock)}

    try {

      if (isEdit) {
        await productService.update(id, payload)
        navigate(`/products/${id}`)
      }
      else {
        await productService.create(payload)
        navigate("/products")
      }
      
    } catch (error) {
      console.log(error)
    }

  }

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormData({...formData, [name]: type === "checkbox" ? checked : value})
  }

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h1>{isEdit ? 'Update Product' : 'Add a Product'}</h1>

      <form onSubmit={handleSubmit}>

        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} type="text" id='name' name='name' value={formData.name} />

        <label htmlFor="description">Description: </label>
        <input onChange={handleChange} type="text" id='description' name='description' value={formData.description} />

        <label htmlFor="price">Price: </label>
        <input onChange={handleChange} type="number" id='price' name='price' value={formData.price} />

        <label htmlFor="stock">Stock: </label>
        <input onChange={handleChange} type="number" id='stock' name='stock' value={formData.stock} />

        <label htmlFor="is_available">Available: </label>
        <input onChange={handleChange} type="checkbox" id='is_available' name='is_available' checked={formData.is_available} />

        <ImageUpload
            onUpload={(url) =>
              setFormData(prev => ({ ...prev, image: url }))
            }
          />

        <button type="submit">{isEdit ? 'Update' : 'Add'}</button>

      </form>

      {formData.image && <img src={formData.image} alt="Uploaded preview" style={{ width: '300px' }} />}

    </div>
  )
}

export default ProductForm