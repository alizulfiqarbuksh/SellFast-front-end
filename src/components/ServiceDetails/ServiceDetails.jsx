import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router'
import * as serviceService from '../../services/serviceService'
import * as bookingService from '../../services/bookingService'

import styles from '../ServiceDetails/ServiceDetails.module.css';

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
    <div className={styles.container}>
      <h1>Service Details</h1>

      <div className={styles.detailWrapper}>
        {service.image && (
          <div className={styles.imageWrapper}>
            <img
              src={service.image}
              alt="Uploaded preview"
              className={styles.serviceImage}
            />
          </div>
        )}

        <div className={styles.infoWrapper}>
          <h3>Name: {service.name}</h3>
          <h4>Description: {service.description}</h4>
          <p>Duration: {service.duration_minutes} minutes</p>
          <p>Price: ${service.price}</p>

          {user && service.is_available && (
            <div className={styles.bookingWrapper}>
              <label>Select date & time:</label>
              <input
                type="datetime-local"
                min={new Date().toISOString().slice(0, 16)}
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className={styles.bookingInput}
              />
              <button
                onClick={handleBooking}
                disabled={!bookingDate}
                className={styles.detailButton}
              >
                Book
              </button>
              {bookingError && (<p> {bookingError} </p>)}  
            </div>
          )}

          {user && user.is_admin && (
            <div className={styles.adminActions}>
              <button
                className={styles.detailButton}
                onClick={() => navigate(`/services/${service.id}/update`)}
              >
                Update
              </button>
              <button
                className={styles.detailButton}
                onClick={() => handleDelete(service.id)}
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

export default ServiceDetails