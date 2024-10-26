import { useRouter } from "next/router"
import DashboardTabBody from './dashboardTabBody';
import ShoppingTabBody from "./shoppingTabBody";
import ProductsTabBody from "./productsTabBody";

export default function TabBody(props) {  
    
    return(<>

        {useRouter().route == "/admin/dashboard" ? <DashboardTabBody  _as = {props._as} />  : <></>}
        {useRouter().route == "/admin/shopping" ? <ShoppingTabBody  _as = {props._as} />  : <></>}
        {useRouter().route == "/admin/products" ? <ProductsTabBody  _as = {props._as} />  : <></>}

    </>)
    
}
