import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import * as bookingService from '../../services/bookingService'
import axios from 'axios'

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
    <div>
      <h1>MyBooking</h1>

      {myBookings.map((booking) =>
        <div key={booking.id}>
          <h3>Service: {booking.service.name}</h3>
          <h4>Price: {booking.service.price}</h4>
          <p>Date: {new Date(booking.booking_datetime).toLocaleString()}</p>
          <p>Status: {booking.status}</p>
        </div>
      )}

    </div>
  )
}

export default MyBooking