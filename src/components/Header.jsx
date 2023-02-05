import React from 'react';
import { CartState } from '../context/Context'
import { Link } from 'react-router-dom';
import { Navbar,Container, FormControl, Dropdown, Badge, Button } from 'react-bootstrap';
import {FaShoppingCart} from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai';


const Header = ({}) => {

    // Import our contextAPi state
    const {state, dispatch, filteredDispatch} = CartState();


  return (
    <Navbar bg="dark" variant="dark" style={{ height:80 }} >
        <Container>
            
            <Navbar.Brand >
                {/* wa are using react route */}
                <Link to="/">Brand Link</Link>
            </Navbar.Brand>
            {/* Search Bar */}
            <Navbar.Text className="search">                
                <FormControl 
                    style={{width: 500}} 
                    type="search" 
                    placeholder="Search a product..." 
                    className="m-auto"
                    // This gonna set the filteredState.searchQuery
                    onChange={(e)=> {
                        filteredDispatch({type: 'SEARCH_QUERY', payload: e.target.value})
                    }}
                />                
            </Navbar.Text>

            {/* DropDown for our cart */}
            <Dropdown >
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <FaShoppingCart color="white" fontSize="25px" />
                    <Badge> {state.cart.length} </Badge>
                    
                </Dropdown.Toggle>

                <Dropdown.Menu  style={{ minWidth:370 }}>
                    {/* check if cart item is greater than 0 */}
                    {
                        state.cart.length > 0 ? (
                            <>
                                {
                                    state.cart.map((item)=> (
                                        <span className='cartItem' key={item.id}>
                                            <img 
                                                src={item.image}
                                                className="cartItemImg"
                                                alt={item.name}
                                            />
                                            <div className='cartItemDetail'>
                                                <span>{item.name}</span>
                                                <span>$ {item.price.split(".")[0]}</span>
                                            </div>
                                            <AiFillDelete
                                                font-size="20px"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => {
                                                    dispatch({
                                                        type: "REMOVE_FROM_CART",
                                                        payload: item
                                                    }) 
                                                }}
                                            />
                                        </span>
                                    ))
                                }
                                <Link to="/cart">
                                    <Button style={{width:"95%", margin:"0 10px" }}>
                                        Go To Cart
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <span style={{ padding:10 }}>Cart is Empty!</span>
                        )
                        
                    }                    
                </Dropdown.Menu>
            </Dropdown>

        </Container>
    </Navbar>
  )
}

export default Header