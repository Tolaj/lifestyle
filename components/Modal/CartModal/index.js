import React from 'react';
import CartListModal from './cartListModal';

function CartModal(props) {
  return (<>
      <CartListModal  _as = {props._as} /> 
  </>);
}

export default CartModal;