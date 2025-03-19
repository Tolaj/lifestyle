import React from 'react';
import CartListModal from './cartListModal';
import CartWishListModal from './cartWishListModal';

function CartModal(props) {
  if(props.cart == "cart"){
    return (<>
      <CartListModal  _as = {props._as} /> 
    </>);
  }else{
    return (<>
      <CartWishListModal  _as = {props._as} /> 
    </>);
  }
  
}

export default CartModal;