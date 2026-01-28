import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router'
import * as cartitemService from '../../services/cartitemService'
import * as orderService from '../../services/orderService'

import styles from './CartItem.module.css';

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

    const handleAddOrder = async () => {
      if (!cartitems || cartitems.length === 0) return;

       const orderPayload = {
        user_id: 0,
        total_price: 0,
        items: cartitems.map(cartItem => ({
        product_id: cartItem.product_id,
        product_name: "",
        price: 0,
        quantity: cartItem.quantity
        }))
      };
      try {
        await orderService.create(orderPayload);
        navigate("/orders");
      } catch (error) {
        console.log(error.response?.data || error);
        alert("Failed to create order");
      }
    };

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
    <main className={styles.cart}>
      <section className={styles.cartWrapper}>
        <h1>Cart Items</h1>

        {cartitems.map(item => (
          <div key={item.id} className={styles.cartItem}>
            <h2>{item.product_name}</h2>
            <p>Product ID: {item.product_id}</p>
            <p>Price: ${item.price.toFixed(2)}</p>
            <p>Quantity: {item.quantity}</p>

            <div className={styles.quantityRow}>
              <label>Quantity:</label>
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
              <button
                type="button"
                onClick={() => handleSubmit(item.id, item.quantity)}
              >
                Update
              </button>
            </div>

            <button
              className={styles.deleteBtn}
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </button>
          </div>
        ))}

        <div className={styles.summary}>
          <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
          <button onClick={handleAddOrder}>Add Order</button>
        </div>
      </section>
    </main>
  );
}

export default CartItem