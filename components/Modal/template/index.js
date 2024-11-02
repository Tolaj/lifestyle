import React from 'react';
import ProductListModal from './productsListModal';
import CategoryListModal from './categoryListModal';

function ProductsModal(props) {
  return (<>
      {props._as.productsTab == 0 ? <ProductListModal  _as = {props._as} /> : <></>}
      {props._as.productsTab == 1 ? <CategoryListModal _as = {props._as} /> : <></>}
  </>);
}

export default ProductsModal;