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

// const deleteCartItem = (id) => {

//   const newCartItemList = cartitems.filter(pokemon => pokemon._id !== id)

//   setPokemons(newPokemonList)
// }


  if (!cartitems) {
    return <p>Loading...</p>
  }

  return (
  <div>
    <h1>Cart Items</h1>

    {cartitems.map(item => (
      <div key={item.id}>
        <h2>Product ID: {item.product_id}</h2>
        <h3>Quantity: {item.quantity}</h3>
        <button onClick={() => handleDelete(item.id)}>Delete</button>

      </div>
    ))}
  </div>
)

}

export default CartItem