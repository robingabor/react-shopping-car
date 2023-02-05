import React from 'react'
import {Form,Button} from 'react-bootstrap';
import { CartState } from '../context/Context';
import Rating from './Rating';

const  Filters = () => {

    // Import our contextAPi state
    const {filteredState: {byStock, byFastDelivery, sort, byRating}, 
        filteredDispatch, 
    } = CartState();

    console.log(byStock, byFastDelivery, sort, byRating)    

    // This gonna set the filteredState.byRating
    const ratingHandler = (i) => {
        filteredDispatch({type:'SORT_BY_RATING', payload: i+1 })
    }

  return (
    <div className='filters'>

        <span className='title'>Filter Products</span>
        {/* ASCENDING Price */}
        <span>
            <Form.Check 
            inline
            label="Ascending"
            name="group1"
            type="radio"
            id={`inline-1`}
            // This gonna set the filteredState.sort 
            onChange={()=> {
                filteredDispatch({type: 'SORT_BY_PRICE', payload: "lowToHigh"})
            }}
            checked={sort ==="lowToHigh" ? true : false }
            />
        </span>
        {/* DESCENDING Price */}
        <span>
            <Form.Check 
            inline
            label="Descending"
            name="group1"
            type="radio"
            id={`inline-2`}
            // This gonna set the filteredState.sort 
            onChange={()=> {
                filteredDispatch({type: 'SORT_BY_PRICE', payload: "highToLow"})
            }}
            checked={sort ==="highToLow" ? true : false }
            />
        </span>
        {/* IN STOCK */}
        <span>
            <Form.Check 
            inline
            label="Include oout of Stock"
            name="group1"
            type="checkbox"
            id={`inline-3`}
            // This gonna set the filteredState.byStock
            onChange={() =>
                filteredDispatch({type: 'SORT_BY_STOCK'})
            }
            checked={byStock}
            />
        </span>
        {/* FAST DELIVERY */}
        <span>
            <Form.Check 
            inline
            label="Fast Delivery Only"
            name="group1"
            type="checkbox"
            id={`inline-4`}
            // This gonna set the filteredState.byFastDelivery
            onChange={() =>
                filteredDispatch({type: 'SORT_BY_FAST_DELIVERY'})
            }
            checked={byFastDelivery}
            />
        </span>
        {/* RATING */}
        <span>
            <label style={{ paddingRight: 10 }}>Rating:</label>
            <Rating 
                ratingHandler={ratingHandler}
                rating={byRating} 
                style={{ cursor: "pointer" }} 
            />
        </span>
        {/* CLEAR FILTERS */}
        <Button 
            variant="light"
            onClick={()=> 
                filteredDispatch({type: 'CLEAR_FILTERS'})
            }
        >
            Clear Filters
        </Button>


    </div>
  )
}

export default Filters