import { useLoaderData, useLocation } from "react-router-dom";
import { Card } from "antd";




function StockDetail() {
    const {pathname} = useLocation();
    const symbol = pathname.split("/").slice(-1);
    return (
        <>
        <Card />
        </>
    )
}

export default StockDetail;