import CartModal from "./CartModal";
import ProductsModal from "./ProductsModal";
import ProfileModal from "./ProfileModal";

export default function Modal(props) {

  return(<>
    {props._as.modalToggle == "/admin/products" ? <ProductsModal  _as = {props._as} /> : <></>}
    {props._as.modalToggle == "/admin/cart" ? <CartModal  _as = {props._as} /> : <></>}
    {props._as.modalToggle == "/admin/profile" ? <ProfileModal  _as = {props._as} /> : <></>}

  </>)
}