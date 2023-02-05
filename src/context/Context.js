// Context going to be accessible all our app

import React, { createContext, useContext, useReducer } from 'react';
import { cartReducer, filterReducer } from './Reducers';
import { faker } from '@faker-js/faker';

const Cart = createContext();
// Seed only renders one type of data
faker.seed(99);

const Context = ({children}) => {

    // Lets generate some fake data with Faker into JSON
    const products = [...Array(20)].map((key) => ({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.fashion(320, 240,     true ),
        inStock: faker.helpers.arrayElement([0,3,5,6,7]),
        fastDelivery: faker.datatype.boolean(),
        ratings: faker.helpers.arrayElement([1,2,3,4,5]),
    }));

    // useReducer hook: it is almost like useState : const [state,dispatch] = useReducer(reducer, defaultValue);
    // we update our state with dispatch method
    // the reducer accepts 2 params: the current state and the action
    const [state,dispatch] = useReducer(cartReducer,{
        products: products,
        cart:[]
    })

    // state for fitering
    const [filteredState, filteredDispatch] = useReducer(filterReducer, {
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
        searchQuery: ""
    })

  return (
    // Provider going to wrap all our app
    //  value property going to contain all the needed state element
    <Cart.Provider value={{ state, dispatch, filteredState, filteredDispatch }} >
        {children}
    </Cart.Provider>
  )
}

export default Context;

// we cac access Context vith the help of useContext
//  useContext takes one param: the Cart wich is the context
export const CartState = () => {
    return useContext(Cart);
}