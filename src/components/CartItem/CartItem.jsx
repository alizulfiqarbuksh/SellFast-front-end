import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router'
import * as cartitemService from '../../services/cartitemService'


function CartItem() {

  const [cartitems, setCardItem] = useState(null)
  const {id} = useParams()

  const navigate = useNavigate()

  

  useEffect(() => {


    const cartItems = async (id) => {
      try {

        const foundCartItem = await cartitemService.getCartItems(id)
        setCardItem(foundCartItem)

      } catch (error) {
        console.log(error)
      }
    }

    if (id) cartItems(id)

  }, [id])

  const handleDelete = async (id) => {
    try {
        const deleteCartItem = await cartitemService.deleteOne(id)

        if(deleteCartItem)
        {
            navigate('/')
        }
    } catch (error) {
        console.log(error)
    }
  }

  
  const handleSubmit = async (itemId, quantity) => {
  try {
    await cartitemService.update(itemId, { quantity })
  } catch (error) {
    console.log(error)
  }
}



  if (!cartitems) {
    return <p>Loading...</p>
  }


    const totalPrice = cartitems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
  <div>
    
      <h1>Cart Items</h1>

    {cartitems.map(item => (
      <div key={item.id}>
        <h2>Product ID: {item.product_id}</h2>
        <h2>Product: {item.product_name}</h2>
        <h3>Price: ${item.price.toFixed(2)}</h3> 
        <h3>Quantity: {item.quantity}</h3>
        <button onClick={() => handleDelete(item.id)}>Delete</button>

        <div>
          <label htmlFor='quantity'>Quantity:</label>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) =>
              setCardItem(prev =>
                prev.map(ci =>
                  ci.id === item.id
                    ? { ...ci, quantity: Number(e.target.value) }
                    : ci
                )
              )
            }
/>

        </div>
        
        <button
        type="button"
        onClick={() => handleSubmit(item.id, item.quantity)}
      >
        Update Quantity
      </button>

            <div>
              <button>Add Order</button>
            </div>
      </div>
    ))}

    <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
    
  </div>
)

}

export default CartItem