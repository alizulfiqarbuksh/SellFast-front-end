import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router'
import * as serviceService from '../../services/serviceService'

function ServiceDetails({user}) {

  const [service, setService] = useState(null)
  const {id} = useParams()
  
  const navigate = useNavigate()

    useEffect(() => {
    
      const serviceDetails = async (id) => {
        try {
  
          const foundService = await serviceService.details(id)
          setService(foundService)
          
        } catch (error) {
          console.log(error)
        }
      }
  
      if (id) serviceDetails(id)
  
    }, [id])

  const handleDelete = async (id) => {
    
    try {
    
      const deletedService = await serviceService.deleteOne(id)
    
      if(deletedService) {
         navigate('/services')
      }
    
          
    } catch (error) {
      console.log(error)
    }
    
  }
    
  if (!service) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>Service Details</h1>
      <div>
        {service.image && <img src={service.image} alt="Uploaded preview" style={{ width: '300px' }} />}
        <h3>Name: {service.name}</h3>
        <h4>Description: {service.description}</h4>
        <p>duration: {service.duration_minutes}</p>
        <p>price: {service.price}</p>
      </div>

      {user && user.is_admin ? 
      <div>
        <button onClick={() => {navigate(`/services/${service.id}/update`)}}>Update</button>
        <button onClick={() => {handleDelete(service.id)}}>Delete</button>
      </div>
      :
      ""
      }
    </div>
  )
}

export default ServiceDetails