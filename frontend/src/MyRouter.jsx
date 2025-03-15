import React from "react";
import { BrowserRouter as MainRouter, Routes, Route } from 'react-router-dom';
import Header from "./partials/Header";
import Home from "./components/interface/home";
import Footer from "./partials/Footer";
import Brand from "./components/brands/Brand";
import Category from "./components/categories/Category";
import Filter from "./components/events/Filter";
import ShowEvent from "./components/events/ShowEvent";
import ShowPlace from "./components/places/ShowPlace";
import AddEvent from "./components/events/AddEvent";
import UpdateEvent from "./components/events/UpdateEvent";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import Dashboard from "./components/admins/Dashboard";
import DashboardUsers from "./components/admins/DashboardUsers";
import DashboardEvents from "./components/admins/DashboardEvents";
import DashboardBrands from "./components/admins/DashboardBrands";
import DashboardCategories from "./components/admins/DashboardCategories";
import SavedEvents from "./components/savedEvents/SavedEvents";
import Account from "./components/users/Account";
import AccountInfo from "./components/users/AccountInfo";
import UpdateBrand from "./components/brands/UpdateBrand";
import UpdateCategory from "./components/categories/UpdateCategory";
import AddCategory from "./components/categories/AddCategory";
import ForgotPassword from  "./components/users/ForgotPassword";
import ResetPassword from  "./components/users/ResetPassword";

const MyRouter = () => {
    return (
        <MainRouter>
            <Header />
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/categories/:slug" element={<Category />}/>
                    <Route path="/events/search/:text" element={<Filter />}/>
                    <Route path="/events/show/:id" element={<ShowEvent />}/>
                    <Route path="/places/show/:slug" element={<ShowPlace />}/>
                    
                    <Route path="/users/login" element={<Login />}/>
                    <Route path="/users/register" element={<Register />}/>
                    <Route path="/admins/dashboard" element={<Dashboard />}/>
                    <Route path="/admins/dashboard/users" element={<DashboardUsers />}/>
                    <Route path="/admins/dashboard/events" element={<DashboardEvents />}/>
                    <Route path="/admins/dashboard/brands" element={<DashboardBrands />}/>
                    <Route path="/admins/dashboard/categories" element={<DashboardCategories />}/>
                    <Route path="/admins/dashboard/events/add" element={<AddEvent />} />
                    <Route path="/admins/dashboard/events/edit/:id" element={<UpdateEvent />}/>
                    <Route path="/admins/dashboard/brands/edit/:id" element={<UpdateBrand />}/>
                    <Route path="/admins/dashboard/categories/add" element={<AddCategory />}/>
                    <Route path="/admins/dashboard/categories/edit/:id" element={<UpdateCategory />}/>

                    <Route path="/savedEvents" element={<SavedEvents />}/>

                    <Route path="/users/account" element={<Account />}/>
                    <Route path="/users/account/info" element={<AccountInfo />}/>
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                </Routes>
            <Footer />
        </MainRouter>
    )
}

export default MyRouter;