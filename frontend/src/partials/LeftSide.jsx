import React from "react";
import { NavLink } from "react-router-dom";

const Leftside = () => {
    return(
        <div className="leftSide">
            <div>
                <h3>Eventos</h3>
                <nav>
                    <NavLink to="/brands/Iglesias">Iglesias</NavLink>
                    <NavLink to="/brands/Hoteles">Hoteles</NavLink>
                    <NavLink to="/brands/Restaurantes">Restaurante</NavLink>
                    <NavLink to="/brands/Museos">Museos</NavLink>
                    <NavLink to="/brands/Parques">Parques</NavLink>
                    <NavLink to="/brands/Eventos">Eventos</NavLink>
                </nav>
            </div>
        </div>
    )
}

export default Leftside;