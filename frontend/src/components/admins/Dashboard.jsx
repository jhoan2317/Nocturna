import React, { useEffect, useState } from "react";
import DashboardLeftSide from "./DashboardLeftSide";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../storage/css/Dashboard.css";

const Dashboard = () => {
    const user = useSelector(store => store.user);
    const isAuthenticated = useSelector(store => store.isAuthenticated);
    const navigate = useNavigate();
    const [statistics, setStatistics] = useState({
        users: 0,
        brands: 0,
        categories: 0,
        events: 0
    });

    const checkIsAuthenticated = () => {
        if (!isAuthenticated || user.role !== 'admin') navigate('/users/login');
    };

    const fetchStatistics = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/statistics');
            if (res.data) {
                setStatistics(res.data);
            }
        } catch (error) {
            console.error("Error fetching statistics:", error);
        }
    };

    useEffect(() => {
        checkIsAuthenticated();
        fetchStatistics();
    }, []);

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="content">
            <DashboardLeftSide />
            <div className="rightSide">
                <h3 className="p-5 m-4">
                    Bienvenido administrador a la sección Panel de control!
                </h3>
                <div className="statistics">
                    <div className="stat-card" onClick={() => handleNavigation('/admins/dashboard/users')}>
                        <p className="stat-title">Usuarios</p>
                        <p className="stat-value">{statistics.users}</p>
                    </div>
                    <div className="stat-card" onClick={() => handleNavigation('/admins/dashboard/brands')}>
                        <p className="stat-title">Marcas</p>
                        <p className="stat-value">{statistics.brands}</p>
                    </div>
                    <div className="stat-card" onClick={() => handleNavigation('/admins/dashboard/categories')}>
                        <p className="stat-title">Categorías</p>
                        <p className="stat-value">{statistics.categories}</p>
                    </div>
                    <div className="stat-card" onClick={() => handleNavigation('/admins/dashboard/events')}>
                        <p className="stat-title">Eventos</p>
                        <p className="stat-value">{statistics.events}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;