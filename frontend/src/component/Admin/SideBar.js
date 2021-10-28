import AddIcon from '@material-ui/icons/AddIcon';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import ListAltIcon from '@material-ui/icons/ListAltIcon';
import PeopleIcon from '@material-ui/icons/People';
import PostAddIcon from '@material-ui/icons/PostAddIcon';
import RateReviewIcon from '@material-ui/icons/RateReview';
import { TreeItem, TreeView } from '@material-ui/lab';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import './SideBar.css';


export const SideBar = () => {
    return (
        <div className="sidebar">
            <Link to="/">
                <img src={logo} alt="Ecommerce Store" />
            </Link>
            <Link to="/admin/dashboard">
                <DashboardIcon /> Dashboard
            </Link>
            <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ImportExportIcon />}>
            <TreeItem nodeId="1" label="Products" >
                <Link to="/admin/products">
                    <TreeItem nodeId="2" label="All" icon={PostAddIcon}/>
                </Link>
                <Link to="/admin/product">
                    <TreeItem nodeId="3" label="Create" icon={AddIcon}/>
                </Link>
            </TreeItem>
            </TreeView>
            <Link to="/admin/orders">
                <p>
                    <ListAltIcon /> 
                    Orders
                </p>
            </Link>
            <Link to="/admin/users">
                <p>
                    <PeopleIcon /> 
                    Users
                </p>
            </Link>
            <Link to="/admin/reviews">
                <p>
                    <RateReviewIcon /> 
                    Reviews
                </p>
            </Link>
        </div>
    )
}
