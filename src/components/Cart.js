import React, {useState, useEffect} from 'react'
import { ListGroup, ListGroupItem, Button, Row, Col, FormControl, Image} from 'react-bootstrap';
import { CartState } from '../context/Context'
import Rating from './Rating';
import { AiFillDelete } from 'react-icons/ai';

const Cart = () => {

  // Import our contextAPi state
  const {
    state: {cart},
     dispatch,
  } = CartState();

  // Local state to the total
  const [total, setTotal] = useState(0);

  // every time our cart array changes we want to recalculat the total
  // curr.price going to be a string we have to covert to Number
  useEffect(() => {
    setTotal(
      cart.reduce((acc,curr) => acc+ Number(curr.price) * curr.qty ,0)
    )
  }, [cart])

  return (
    <div className='home'>
      {/* cart items */}
      <div className="productContainer">
        <ListGroup>
          {
            cart.map(item => {
              return (
                <ListGroup.Item key={item.id}>
                  <Row>
                    {/* md: The number of columns that will fit next to each other on medium devices (≥768px) */}
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded/>
                    </Col>
                    <Col md={2}>
                      <span>{item.name}</span>
                    </Col>
                    <Col md={2}>
                      <span>$ {item.price}</span>
                    </Col>
                    <Col md={2}>
                      <Rating rating={item.ratings} />
                    </Col>
                    <Col md={2}>
                      {/* FormControl going to render as a select, max qty = inStock items */}
                      <FormControl 
                        as="select" 
                        value={item.qty}
                        onChange={
                          (e) => 
                            dispatch({
                              type:'CHANGE_CART_QTY',
                              payload: {
                                id: item.id,
                                qty: e.target.value
                              }
                            })
                        }
                      >
                        {
                          [...Array(item.inStock).keys()].map((x)=>(
                            
                              <option key={x +1}>{x + 1}</option>
                            
                          ))
                        }
                      </FormControl>
                    </Col>
                    <Col md={2}>
                      
                      <Button
                        type='button'
                        variant='light'                        
                        onClick={() => {
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: item
                            }) 
                          }}
                        >
                          <AiFillDelete fontSize="20px" />
                        </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>                
              )
              })
          }
        </ListGroup>
      </div>

      {/* nav fot total price and checkout */}
      <div className='filters summary'>
          <span className='title' >
              Subtotal ({cart.length}) items
          </span>
          <span  style={{ fontWeight: 700, fontSize: 20 }}>
              Total: $ {total}
          </span>
          <Button type="button" disabled={cart.length===0}>
            Proceed to Checkout
          </Button>
          
      </div>
    </div>
  )
}

export default Cart