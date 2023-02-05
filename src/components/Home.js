import React from 'react'
import { CartState } from '../context/Context'
import SingleProduct from './SingleProduct';
import Filters from './Filters';
import './style.css';

const Home = () => {

  // import the Context
  //  lets desctuct from it oir state wicj contains the cart array and the products object
  //  we can destructure 2 levels deep
  const {state, filteredState: {byStock, byFastDelivery, sort, byRating, searchQuery}} = CartState();

  console.log(byFastDelivery)

  // transform products: apply the filters
  const transformProduct = () => {
    // make a copy of the products
    let sortedProducts = state.products;

    if(sort){
      sortedProducts= sortedProducts.sort((a,b)=> 
        // if sort equals to lowToHight than it going to be ascending otherwise descending
        sort === "lowToHigh" ? a.price - b.price : b.price-a.price
      )      
    }
    // by default the byStock is false therefore we only want to display the items wich are on stock
    if(!byStock){
      sortedProducts = sortedProducts.filter((item)=> item.inStock)
    }
    if(byFastDelivery){
      sortedProducts = sortedProducts.filter((item)=> item.fastDelivery)
    }
    if(byRating){
      sortedProducts = sortedProducts.filter((item)=> item.ratings >= byRating)
    }
    if(searchQuery){
      sortedProducts = sortedProducts.filter((item)=> item.name.toLowerCase().includes(searchQuery))
    }

    return sortedProducts;
  }

  console.log(state);

  return (
    <div className='home'>
      
      {/* Filter Sidebar */}
      <Filters />

      {/* Product Container */}
      <div className='productContainer'>
        {
          transformProduct().map(product => {
            return <SingleProduct key={product.id} product={product}  />
          })
        }
      </div>
    </div>
  )
}

export default Home