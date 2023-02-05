import React from 'react'
import { CartState } from '../context/Context'
import {Card, Button} from 'react-bootstrap'
import Rating from './Rating'

const  SingleProduct = ({product}) => {

    // Import our contextAPi state
    const {state, dispatch} = CartState();
        

  return (
    <div className='products'>
        <Card>
            <Card.Img variant='top' src={product.image} alt={product.name} />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Subtitle style={{ paddingBottom: 10 }}>
                    <span>
                        $ {product.price.split(".")[0]}
                    </span>
                    {
                        product.fastDelivery ? (
                            <div>Fast Delivery</div>
                        ) : (
                            <div>4 days Delivery</div>
                        )
                    }

                    <Rating rating={product.ratings} />

                </Card.Subtitle>

                {/* check if the item is already in the cart with some() method */}
                {
                    state.cart.some(p => p.id === product.id) ? (                        
                        <Button
                            onClick={() =>{
                                dispatch({
                                type: "REMOVE_FROM_CART",
                                payload: product
                                })                        
                            }}
                            variant='danger'
                        >
                            Remove From Card
                        </Button>
                    ) : (
                        <Button 
                            onClick={() =>{
                                dispatch({
                                    type: "ADD_TO_CART",
                                    payload: product
                                })
                            
                            }}
                            disabled={product.inStock === 0}
                        >
                        {
                            product.inStock > 0 ? "Add To Cart" : "Out of Stock"
                        }
                        </Button>
                    )
                }

            </Card.Body>
        </Card>
    </div>
  )
}

export default SingleProduct