import React, { useEffect, useState } from "react";
import DashboardLeftSide from "./DashboardLeftSide";
import axios from "axios";
import Spinner from "../../partials/Spinner";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../storage/css/ModalQ.css";

const DashboardUsers = () => {
    const [users, setUsers] = useState(null);
    const user = useSelector(store => store.user);
    const isAuthenticated = useSelector(store => store.isAuthenticated);
    const navigate = useNavigate();

    const checkIsAuthenticated = () => {
        if (!isAuthenticated || user.role !== "admin") navigate("/users/login");
    };

    const handleToggleBlock = async (slug, active) => {
        const confirmAction = window.confirm(
            `¿Estás seguro de ${active ? "bloquear" : "activar"} este usuario?`
        );
        if (confirmAction) {
            try {
                const res = await axios.put(`http://localhost:8000/api/users/block/${slug}`);
                if (res.data.success) {
                    // ✅ Actualiza solo el usuario afectado en el estado sin recargar toda la lista
                    setUsers(prevUsers => 
                        prevUsers.map(user => 
                            user.slug === slug ? { ...user, active: !active } : user
                        )
                    );
                }
            } catch (err) {
                console.log("Error al bloquear usuario:", err.message);
            }
        }
    };

    useEffect(() => {
        checkIsAuthenticated();
        axios
            .get("http://localhost:8000/api/users")
            .then((res) => setUsers(res.data))
            .catch((err) => console.error("Error al obtener usuarios:", err));
    }, []);

    return (
        <div className="content dashboardUsers">
            <DashboardLeftSide />
            <div className="rightSide">
                <table style={{ width: "95%" }} className="table table-striped table-hover mx-auto my-5">
                    <thead className="text-muted">
                        <tr>
                            <td>#</td>
                            <td>Perfíl</td>
                            <td>Nombre</td>
                            <td>Cumpleaños</td>
                            <td>Correo</td>
                            <td>Estado</td>
                        </tr>
                    </thead>
                    <tbody>
                        {users == null ? (
                            <tr>
                                <td colSpan={6}>
                                    <Spinner />
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.slug}>
                                    <td>{user.id}</td>
                                    <td>
                                        <img
                                            src={`/users_img/${user.profile?.profilePic ?? "no-img.jpg"}`}
                                            alt="profile_pic"
                                            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                                        />
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.birthday}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                checked={user.active}
                                                onChange={() => handleToggleBlock(user.slug, user.active)}
                                            />
                                            <span className="slider round"></span>
                                        </label>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DashboardUsers;
