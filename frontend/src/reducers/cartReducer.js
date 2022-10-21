import {
  CART_ADD_ITEM,
  CART_ADD_SHIPPING_ADDRESS,
  CART_REMOVE_ITEM,
  CART_UPDATE_ITEM,
  CART_ADD_PAYMENT_METHOD,
} from "../const/cartConstants.js";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  // debugger
  switch (action.type) {
    case CART_ADD_ITEM:
      //set the item to be the payload
      // if the item is not in the cart
      const item = action.payload;

      // if item is already in cart
      /**
       * Udemy comment
       * search in the state.cartItems array
       * for the existence of the specific product
       * that is defined by item (by the action.payload)
       * if we find a match assign the result to the existItem variable
       */

      const existItem = state.cartItems.find((x) => x.product === item.product);

      // if there is already a product matching the item in the state.cartItems array
      if (existItem) {
        // return the existing state with adjusted cardItems
        return {
          ...state,
          // map through the cardItems array
          // and replace the matching product with the new item
          // leave the rest products as they were
          // and increase the quantity of the matching product by 1
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product
              ? { ...x, qty: x.qty + item.qty }
              : x
          ),

          // cartItems: state.cartItems.map((x) =>
          //   x.product === existItem.product ? item : x
          // ),
        };
        // otherwise if the item is NOT already a product matching the item in the state.cartItems array
      } else {
        // return the existing state with adjusted cardItems
        return {
          ...state,
          // return a new cardItems array with the previous products spread and add the new item
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_UPDATE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.map((x) =>
          x.product === action.payload.product
            ? { ...x, qty: action.payload.qty }
            : x
        ),
      };

    case CART_REMOVE_ITEM:
      // debugger
      // return the existing state with adjusted cardItems
      return {
        ...state,
        // return a new cardItems array with the previous products spread and remove the item
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    case CART_ADD_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    
    case CART_ADD_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
