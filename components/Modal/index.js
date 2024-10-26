import ProductsModal from "./ProductsModal";

export default function Modal(props) {

  return(<>
    {props._as.modalToggle == "/admin/products" ? <ProductsModal  _as = {props._as} /> : <></>}

  </>)
}