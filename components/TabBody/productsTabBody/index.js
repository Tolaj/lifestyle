import React from "react";
import ProductList from "./productList";
import CategoryList from "./categoryList";
import OrderList from "./orderList";
import WishList from "./wishList";
import InventoryList from "./inventoryList";

// components



// layout for page


export default function ProductsTabBody(props) {
   
   return(<>
            {props._as.productsTab == 0 ? <ProductList  _as = {props._as} reloadChild = {props._as.reloadChild}  setReloadChild ={props._as.setReloadChild} /> : <></>}
            {props._as.productsTab == 1 ? <CategoryList  _as = {props._as} reloadChild = {props._as.reloadChild}  setReloadChild ={props._as.setReloadChild} /> : <></>}
            {props._as.productsTab == 2 ? <WishList  _as = {props._as} reloadChild = {props._as.reloadChild}  setReloadChild ={props._as.setReloadChild} /> : <></>}
            {props._as.productsTab == 3 ? <InventoryList  _as = {props._as} reloadChild = {props._as.reloadChild}  setReloadChild ={props._as.setReloadChild} /> : <></>}
            {props._as.productsTab == 5 ? <OrderList  _as = {props._as} reloadChild = {props._as.reloadChild}  setReloadChild ={props._as.setReloadChild} /> : <></>}

    </>)

  
}



