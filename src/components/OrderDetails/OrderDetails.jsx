import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import * as orderService from '../../services/orderService'

function OrderDetails() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await orderService.getOne(id)
        setOrder(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchOrder()
  }, [id])

  if (!order) return <p>Loading...</p>

  return (
    <div>
      <h1>Order #{order.id}</h1>
      <h3>Status: {order.status}</h3>
      <h3>Total: {order.total_price} BHD</h3>

      <h2>Items</h2>
      {order.items.map(item => (
        <div key={item.id} style={{border: "1px solid #ccc", margin: "10px", padding: "10px"}}>
          <h4>{item.product_name}</h4>
          <p>Price: {item.price} BHD</p>
          <p>Quantity: {item.quantity}</p>
          <p>Subtotal: {(item.price * item.quantity).toFixed(2)} BHD</p>
        </div>
      ))}
    </div>
  )
}

export default OrderDetails
