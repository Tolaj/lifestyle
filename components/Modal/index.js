import CartModal from "./CartModal";
import ProductsModal from "./ProductsModal";

export default function Modal(props) {

  return(<>
    {props._as.modalToggle == "/admin/products" ? <ProductsModal  _as = {props._as} /> : <></>}
    {props._as.modalToggle == "/admin/cart" ? <CartModal  _as = {props._as} /> : <></>}

  </>)
}