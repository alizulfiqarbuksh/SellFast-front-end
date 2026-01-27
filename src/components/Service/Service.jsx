import React, { useEffect, useState } from 'react'
import * as serviceService from '../../services/serviceService'
import { useNavigate } from 'react-router'

function Service({user}) {

  const [services, setServices] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const navigate = useNavigate()
  
    useEffect(() => {
  
      const getServices = async () => {
        try {
          
          const service = await serviceService.show()
          setServices(service)
  
        } catch (error) {
          console.log(error)
        }
      }
  
      getServices()
  
    }, [])

    const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h1>Services</h1>

      <input type="text" placeholder="Search services..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ marginBottom: '1rem' }} />

      {
        filteredServices.map((service) => 
          <div key={service.id}>
            {service.image && <img src={service.image} alt="Uploaded preview" style={{ width: '300px' }} />}
            <h3>Name: {service.name}</h3>
            <h4>Price: {service.price}</h4>
            {user && service.is_available ? <button onClick={() => {navigate(`/services/${service.id}`)}}>Details</button> : "Not Available"}
            {user.is_admin && !service.is_available ? <button onClick={() => {navigate(`/services/${service.id}`)}}>Details</button> : ""}
          </div>
        )
      }

    </div>
  )
}

export default Service