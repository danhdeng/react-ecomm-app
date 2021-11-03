import { Typography } from '@material-ui/core';
import { useEffect } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllOrders } from '../../actions/orderAction';
import { getAdminProduct } from '../../actions/productAction';
import { getAllUsers } from '../../actions/userAction';
import { MetaData } from '../layout/MetaData';
import { SideBar } from './SideBar';
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
            <SideBar />

            <div className="dashboardContainer">
                <Typography component="h1">Dashboard</Typography>
                <div className="dashboardSummary">
                    <div>
                        <p>Total Amount <br />{`$${totalAmount}`}</p>
                    </div>
                    <div className="dashboardSummaryBox2">
                        <Link to="/admin/products">
                            <p>Product</p>
                            <p>{products && products.length}</p>
                        </Link>
                        <Link to="/admin/orders">
                            <p>Orders</p>
                            <p>{users && users.length}</p>
                        </Link>
                        <Link to="/admin/users">
                            <p>Users</p>
                            <p>{products && products.length}</p>
                        </Link>
                    </div>
                </div>
                <div className="lineChart">
                    <Line data={lineState} />
                </div>
                <div className="doughnutChart">
                    <Doughnut data={doughnutState} />
                </div>
            </div>
        </div>
    );
};
