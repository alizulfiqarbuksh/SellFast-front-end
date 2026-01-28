import React, { useEffect, useState } from 'react'
import * as bookingService from '../../services/bookingService'

import styles from '../Booking/Booking.module.css';

function Booking() {

  const [bookings, setBookings] = useState([])

  useEffect(() => {

    const fetchBookings = async () => {
      try {

        const data = await bookingService.show()
        setBookings(data)

      } catch (error) {
        console.log(error)
      }
    }

    fetchBookings()
    
  }, [])

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
        const updated = await bookingService.update(bookingId, newStatus)

        setBookings(prev => prev.filter(booking => booking.id !== bookingId))

    } catch (error) {
        console.log(error)
      }
  }

  return (
    <div className={styles.container}>
      <h1>Bookings</h1>

      {bookings.length === 0 && <p>No bookings found.</p>}

      {bookings.map((booking) => (
        <div key={booking.id} className={styles.bookingCard}>
          <h3>Service: {booking.service.name}</h3>
          <p>User: {booking.user.username}</p>
          <p>Price: {booking.service.price} BHD</p>
          <p>Date: {new Date(booking.booking_datetime).toLocaleString()}</p>
          <p>Status: <strong>{booking.status}</strong></p>

          {booking.status === 'pending' && (
            <div className={styles.actions}>
              <button
                className={styles.detailButton}
                onClick={() => handleStatusChange(booking.id, 'approved')}
              >
                Approve
              </button>
              <button
                className={styles.detailButton}
                onClick={() => handleStatusChange(booking.id, 'rejected')}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Booking