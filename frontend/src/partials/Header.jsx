import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import blackLogo from "../storage/logo/blackLogo-removebg.png";
import Search from "../components/events/Search";
import UserIcon from "../components/users/UserIcon";
import { useSelector } from "react-redux";

const Header = () => {
    const brands = useSelector(store => store.brands);
    const [displayBrands, setDisplayBrands] = useState(false);
    const [displaySearch, setDisplaySearch] = useState(false);
    const user = useSelector(store => store.user);

    return (
        <header>
            <div className="menu" onClick={() => document.querySelector("body").classList.toggle("open")}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div className="logoP">
                <NavLink to="/">
                    <img src={blackLogo} alt="Logo" />
                </NavLink>
            </div>

            <nav className="nav1">
                {user && user.role === "admin" ? (
                    // Si el usuario es admin, solo muestra el enlace del Panel de Control
                    <NavLink to="/admins/dashboard" title="Accede al panel de administración"><i className="fa-solid fa-sliders"></i> Panel de Control</NavLink>
                ) : (
                    // Si NO es admin, muestra los enlaces normales
                    <>
                        <NavLink to="/" title="Volver a la página principal">Inicio</NavLink>
                        <span 
                            className={displayBrands ? "brands active" : "brands"} 
                            onClick={() => setDisplayBrands(!displayBrands)}
                            title="Ver categorías de eventos"
                        >
                            Eventos <i className={`fa-solid fa-chevron-${displayBrands ? "up" : "down"}`}></i>
                        </span>
                        <div className={displayBrands ? "brandDiv" : ""}>
                            {brands && brands.map(brand => (
                                <NavLink 
                                    key={brand.id} 
                                    to={`/brands/${brand.title}`} 
                                    onClick={() => setDisplayBrands(false)}
                                    title={`Ver eventos de ${brand.title}`}
                                >
                                    {brand.title}
                                </NavLink>
                            ))}
                        </div>
                    </>
                )}
            </nav>

            <nav className="nav2">
                {user && user.role !== "admin" && (
                    <>
                        <span className="searchBtn" onClick={() => setDisplaySearch(true)} title="Buscar eventos">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </span>
                        <div className={displaySearch ? "searchCadre open" : "searchCadre"}>
                            <i className="fa-solid fa-xmark" onClick={() => setDisplaySearch(false)} title="Cerrar búsqueda"></i>
                        </div>
                        <Search setDisplaySearch={setDisplaySearch} displaySearch={displaySearch} />
                    </>
                )}
                <UserIcon />
            </nav>
        </header>
    );
};

export default Header;
