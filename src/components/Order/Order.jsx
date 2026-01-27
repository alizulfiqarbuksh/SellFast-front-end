import React, { useEffect, useState } from 'react'
import * as orderService from '../../services/orderService'
import { useNavigate } from 'react-router'

function Order() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
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

  const filteredOrders = orders.filter(order =>
    order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toString().includes(searchTerm) ||
    order.total_price.toString().includes(searchTerm)
  )


  if (loading) return <p>Loading orders...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h1>Orders</h1>

      <input type="text" placeholder="Search order by ID, status, or price..." value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '1rem', padding: '6px', width: '250px' }}
      />

      {filteredOrders.length === 0 ? (
        <p>No pending orders found</p>
      ) : (
        filteredOrders.map(order => (
          <div key={order.id} style={{border: "1px solid #ccc", padding: "10px", marginBottom: "10px"}}>
            <h3>Order #{order.id}</h3>
            <h3>Status: {order.status}</h3>
            <h4>Total: {order.total_price.toFixed(2)} BHD</h4>
            <button onClick={() => navigate(`/orders/${order.id}`)}>
              Details
            </button>
          </div>
        ))
      )}
    </div>
  )
}

export default Order