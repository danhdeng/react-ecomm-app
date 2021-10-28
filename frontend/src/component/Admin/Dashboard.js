import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../../actions/orderAction';
import { getAdminProduct } from '../../actions/productAction';
import { getAllUsers } from '../../actions/userAction';
import { MetaData } from '../layout/MetaData';

export const Dashboard = () => {
    const dispatch= useDispatch();
    const {products}=useSelector((state)=>state.products);
    const {orders}=useSelector((state)=>state.allOrders);
    const {users}=useSelector((state)=>state.allUsers);
    let outOfStock=0;
    products && products.forEach((product)=>{
        if(product.Stock===0){
            outOfStock +=1;
        }
    });
    let totalAmount=0;
    orders && orders.forEach((order)=>{
        totalAmount += order.Price.totalPrice;
    });

    const lineState={
        labels:["Intial Amount", "Amount Earned"],
        datasets:[
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["tomato"],
                hoverBackgroundColor:["rgb(197,72,49)"],
                data:[0, totalAmount],
            },
        ],
    };

    const doughnutState={
        labels:["Out of stock", "InStock"],
        datasets: [
            {
                backgroundColor:["#00A6B4", "#6800B4"],
                hoverBackgroundColor:["#4B5000","#35014F"],
                data: [outOfStock, products.length-outOfStock],
            },
        ],
    }

    useEffect(() => {
        dispatch(getAdminProduct());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
    },[dispatch]);

    return(
        <div className="dashboard">
            <MetaData title="Dashboard - Admin Panel" />
        </div>
    );


}
