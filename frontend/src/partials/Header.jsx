import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import blackLogo from "../storage/logo/blackLogo-removebg.png";
import Search from "../components/events/Search";
import UserIcon from "../components/users/UserIcon";
import WorkWithUs from "../components/users/WorkWithUs";

const Header = () => {
    const isAuth = useSelector(state => state.isAuthenticated);

    return(
        <header>
            <div className="logo">
                <NavLink to="/">
                    <img src={blackLogo} alt="logo" />
                </NavLink>
            </div>
            <Search />
            <nav>
                <ul>
                    <li><NavLink to="/">Inicio</NavLink></li>
                    {isAuth && <li><NavLink to="/dashboard">Dashboard</NavLink></li>}
                </ul>
            </nav>
            <div className="d-flex align-items-center">
                <WorkWithUs />
                <UserIcon />
            </div>
        </header>
    )
}

export default Header;
