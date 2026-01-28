import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router'
import * as serviceService from '../../services/serviceService'
import * as bookingService from '../../services/bookingService'

function ServiceDetails({user}) {

  const [service, setService] = useState(null)
  const {id} = useParams()
  const [bookingDate, setBookingDate] = useState("")
  const [bookingError, setBookingError] = useState("")
  
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

  const handleBooking = async () => {
    try {

      setBookingError("")

      await bookingService.create({
        service_id: service.id,
        booking_datetime: bookingDate
      })

      navigate('/bookings/me')
      
    } catch (error) {
      console.log(error)
      if (error.response && error.response.data?.detail) {
        setBookingError(error.response.data.detail)
      } else {
        setBookingError("Something went wrong. Please try again.")
      }
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

      {user && service.is_available ?
       <div>
        <label>Select date & time:</label>
        <input type="datetime-local" min={new Date().toISOString().slice(0, 16)} value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />

        <button onClick={handleBooking} disabled={!bookingDate}>Book</button> 
        {bookingError && (<p> {bookingError} </p>
)}  
       </div> 
      :
       ""}

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