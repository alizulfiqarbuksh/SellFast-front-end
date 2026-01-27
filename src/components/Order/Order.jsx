import React, { useEffect, useState } from 'react'
import * as orderService from '../../services/orderService'
import { useNavigate } from 'react-router'

function Order() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const getOrders = async () => {
      setLoading(true)
      try {
        const data = await orderService.show()
        setOrders(data)
      } catch (err) {
        setError("Failed to fetch orders")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    getOrders()
  }, [])

  if (loading) return <p>Loading orders...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h1>Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map(order => (
          <div key={order.id}>
            <h3>Status: {order.status}</h3>
            <h4>Total: {order.total_price.toFixed(2)} BHD</h4>
            <button onClick={() => navigate(`/orders/${order.id}`)}>Details</button>
          </div>
        ))
      )}
    </div>
  )
}

export default Order