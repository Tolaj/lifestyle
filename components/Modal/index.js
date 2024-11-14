import CartModal from "./CartModal";
import GroupModal from "./GroupModal/groupModal";
import ProductsModal from "./ProductsModal";
import ProfileModal from "./ProfileModal";

export default function Modal(props) {

  return(<>
    {props._as.modalToggle == "/admin/products" ? <ProductsModal  _as = {props._as} /> : <></>}
    {props._as.modalToggle == "/admin/profile" ? <ProfileModal  _as = {props._as} /> : <></>}

    {props._as.modalToggle == "/admin/cart" ? <CartModal  _as = {props._as} /> : <></>}
    {props._as.modalToggle == "/admin/group" ? <GroupModal  _as = {props._as} /> : <></>}

  </>)
}