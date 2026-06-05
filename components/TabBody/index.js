// components/TabBody/index.js
import { useRouter } from "next/router"
import DashboardTabBody from './dashboardTabBody';
import FinanceTabBody from "./financeTabBody";
import ProductsTabBody from "./productsTabBody";
import ProfileTabBody from "./profileTabBody";

export default function TabBody(props) {
    const { route } = useRouter();

    return (<>
        {route === "/admin/dashboard" && <DashboardTabBody _as={props._as} />}
        {route === "/admin/finance" && <FinanceTabBody _as={props._as} />}
        {route === "/admin/products" && <ProductsTabBody _as={props._as} />}
        {route === "/admin/profile" && <ProfileTabBody _as={props._as} />}
    </>)
}