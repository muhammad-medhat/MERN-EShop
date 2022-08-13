import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../const/constants.js";

export const cartReducer = (state = { cartItems: [] }, action) => {
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
          cartItems: state.cartItems.map((x) =>
            x.product._id === existItem.product._id ? item : x
          ),
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
    default:
      return state;
  }
};
