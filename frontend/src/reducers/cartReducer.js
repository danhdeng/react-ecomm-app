import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO
} from '../constants/cartConstants';

export const cartReducer = (state={cartItems:[], shippingInfo:{}}, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return;
        
        case REMOVE_CART_ITEM:
            return;

        case SAVE_SHIPPING_INFO:
            return;
        default:
            return state;
    }
}
