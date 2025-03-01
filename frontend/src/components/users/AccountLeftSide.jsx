import React from "react";
import { NavLink } from "react-router-dom";

const AccountLeftSide = () => {
    return(
        <div className="leftSide">
            <div>
                <h3>Categorias</h3>
                
            </div>

            <div>
                <h3>Ajustes</h3>
                <nav>
                    <NavLink className='my-2' to="/users/account/info">Información personal</NavLink>
                </nav>
            </div>
        </div>
    )
}

export default AccountLeftSide;