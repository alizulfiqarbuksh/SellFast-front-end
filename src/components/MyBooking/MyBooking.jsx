import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import * as bookingService from '../../services/bookingService'
import axios from 'axios'

import styles from '../MyBooking/MyBooking.module.css';

function MyBooking() {

  const [myBookings, setMyBookings] = useState([])

  useEffect(() => {
    const getBookings = async () => {
      try {

        const bookings = await bookingService.myBookings()
        setMyBookings(bookings)
        
      } catch (error) {
        console.log(error)
      }
    }

    getBookings()

  },[])

  return (
    <div className={styles.container}>
      <h1>My Bookings</h1>

      {myBookings.length === 0 && <p>No bookings found.</p>}

      {myBookings.map((booking) => (
        <div key={booking.id} className={styles.bookingCard}>
          <div className={styles.bookingInfo}>
            <h3>Service: {booking.service.name}</h3>
            <p>Price: {booking.service.price} BHD</p>
            <p>Date: {new Date(booking.booking_datetime).toLocaleString()}</p>
            <p>Status: <strong>{booking.status}</strong></p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyBooking