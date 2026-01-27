import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import * as serviceService from '../../services/serviceService'
import ImageUpload from '../ImageUpload/ImageUpload'

function ServiceForm({ user }) {

  const navigate = useNavigate()
  const { id } = useParams()

  const isEdit = Boolean(id)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration_minutes: "",
    is_available: true,
    image: ""
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isEdit) {
      setLoading(false)
      return
    }

    const getService = async () => {
      try {
        const service = await serviceService.details(id)
        setFormData({
          ...service,
          price: String(service.price),
          duration_minutes: String(service.duration_minutes)
        })
        setLoading(false)
      } catch (error) {
        console.log(error)
        navigate('/services', { replace: true })
      }
    }

    getService()
  }, [id, isEdit, navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const payload = {
      ...formData,
      price: Number(formData.price),
      duration_minutes: Number(formData.duration_minutes)
    }

    try {
      if (isEdit) {
        await serviceService.update(id, payload)
        navigate(`/services/${id}`)
      } else {
        await serviceService.create(payload)
        navigate('/services')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h1>{isEdit ? 'Update Service' : 'Add a Service'}</h1>

      <form onSubmit={handleSubmit}>

        <label htmlFor="name">Name:</label>
        <input onChange={handleChange} type="text" id="name" name="name" value={formData.name} required />

        <label htmlFor="description">Description:</label>
        <input onChange={handleChange} type="text" id="description" name="description" value={formData.description} />

        <label htmlFor="price">Price:</label>
        <input onChange={handleChange} type="number" id="price" name="price" value={formData.price} required />

        <label htmlFor="duration_minutes">Duration (minutes):</label>
        <input onChange={handleChange} type="number" id="duration_minutes" name="duration_minutes" value={formData.duration_minutes} required />

        <label htmlFor="is_available">Available:</label>
        <input onChange={handleChange} type="checkbox" id="is_available" name="is_available" checked={formData.is_available}/>

        <ImageUpload onUpload={(url) => setFormData(prev => ({ ...prev, image: url }))}/>

        <button type="submit"> {isEdit ? 'Update Service' : 'Add Service'} </button>

      </form>

      {formData.image && (<img src={formData.image} alt="Uploaded preview" style={{ width: '300px', marginTop: '10px' }}/>
      )}
    </div>
  )
}

export default ServiceForm
