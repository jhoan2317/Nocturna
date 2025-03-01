import React from "react";
import {BrowserRouter as MainRouter, Routes, Route } from 'react-router-dom';
import Header from "./partials/Header";
import Home from "./components/interface/home";
import Footer from "./partials/Footer";
import Brand from "./components/brands/Brand";
import Gender from "./components/Genders/Gender";
import Category from "./components/categories/Category";
import Filter from "./components/events/Filter";
import ShowEvent from "./components/events/ShowEvent";
import AddEvent from "./components/events/AddEvent";
import UpdateEvent from "./components/events/UpdateEvent";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import Dashboard from "./components/admins/Dashboard";
import DashboardUsers from "./components/admins/DashboardUsers";
import DashboardEvents from "./components/admins/DashboardEvents";
import SavedEvents from "./components/savedEvents/SavedEvents";
import Account from "./components/users/Account";
import AccountInfo from "./components/users/AccountInfo";

const MyRouter = () => {
    return (
        <MainRouter>
            <Header />
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/brands/:title" element={<Brand />}/>
                    <Route path="/categories/:title" element={<Category />}/>
                    <Route path="/events/search/:text" element={<Filter />}/>
                    <Route path="/events/show/:id" element={<ShowEvent />}/>
                    
                    <Route path="/users/login" element={<Login />}/>
                    <Route path="/users/register" element={<Register />}/>
                    <Route path="/admins/dashboard" element={<Dashboard />}/>
                    <Route path="/admins/dashboard/users" element={<DashboardUsers />}/>
                    <Route path="/admins/dashboard/events" element={<DashboardEvents />}/>
                    <Route path="/admins/dashboard/events/add" element={<AddEvent />} />
                    <Route path="/admins/dashboard/events/edit/:id" element={<UpdateEvent />}/>

                    <Route path="/savedEvents" element={<SavedEvents />}/>

                    <Route path="/users/account" element={<Account />}/>
                    <Route path="/users/account/info" element={<AccountInfo />}/>

                </Routes>
            <Footer />
        </MainRouter>
    )
}

export default MyRouter;