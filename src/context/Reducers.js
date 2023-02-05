export const cartReducer = (state,action) => {
    switch(action.type){
        case "ADD_TO_CART":
           return {...state, cart: [...state.cart,{...action.payload,qty:1}]}
            break;
        case "REMOVE_FROM_CART":
            return {
                ...state,
                cart: state.cart.filter(item => {
                return item.id !== action.payload.id
            })}
            break;
        case "CHANGE_CART_QTY":
            // set the qty to action.payload 
            return {
                ...state,
                cart: state.cart.filter(item => 
                    item.id === action.payload.id ? (item.qty = action.payload.qty) : item.qty
                )
            };
            
            break;
        default:
            return state;
    }
}

export const filterReducer = (state, action) => {
    switch(action.type){
        // this case will be used by Ascending and Descending sort
        case 'SORT_BY_PRICE':
            return {...state, sort: action.payload}
            break;
        case 'SORT_BY_STOCK':
            return {...state, byStock: !state.byStock}
            break;
        case 'SORT_BY_FAST_DELIVERY':
            return {...state, byFastDelivery: !state.byFastDelivery}
            break;
        case 'SORT_BY_RATING':
            return {...state, byRating: action.payload}
            break;
        case 'SEARCH_QUERY':
            return {...state, searchQuery: action.payload}
            break;
        case 'CLEAR_FILTERS':
            // we just return the initial state
            return {
                byStock: false,
                byFastDelivery: false,
                byRating: 0,
                searchQuery: ""
            }
            break;
        default:
            return state;
    }
}