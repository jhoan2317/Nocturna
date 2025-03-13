import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import api from '../../axios/axios';
import Cookies from "js-cookie";

const UserIcon = () => {
    const isAuthenticated = useSelector(store => store.isAuthenticated);
    const user = useSelector(store => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [displayDiv, setDisplayDiv] = useState(false);
    const routes = [
<<<<<<< HEAD
        {id:0, name:'Cuenta', route:'/users/account', isAuthenticated: true, tooltip: 'Gestiona tu perfil y configuración'},
        {id:1, name:'Preferencias', route:'/savedEvents', isAuthenticated: true, tooltip: 'Ver tus eventos guardados'},
        {id:2, name:'Ingreso', route:'/users/login', isAuthenticated: false, tooltip: 'Inicia sesión en tu cuenta'},
        {id:3, name:'Desconectarse', isAuthenticated: true, tooltip: 'Cerrar sesión'},
        {id:4, name:'Registro', route:'/users/register', isAuthenticated: null, tooltip: 'Crear una nueva cuenta'}
=======
        {id:0, name:'Cuenta', route:'/users/account', isAuthenticated: true},
        {id:1, name:'Preferencias', route:'/savedEvents', isAuthenticated: true},
        {id:2, name:'Ingreso', route:'/users/login', isAuthenticated: false},
        {id:3, name:'Desconectarse', isAuthenticated: true},
        {id:4, name:'Registro', route:'/users/register', isAuthenticated: null}
>>>>>>> b2b2cf4189ef85c0e5dfea594b9c8d7fd0f7d831
    ];

    const handleLogOut = async () => {
        const confirmLogout = window.confirm('¿Estás seguro de que quieres cerrar sesión?');
        if(confirmLogout){
            try {
                await api.post('/api/users/logout');
                dispatch({type:'logout'});
                Cookies.remove('token', { path: '/' });
                localStorage.removeItem('user');
                navigate('/users/login');
            } catch (error) {
                console.error('Error al cerrar sesión:', error);
            }
        }
    };

    return(
        <div className="userIcon">
            {!isAuthenticated
<<<<<<< HEAD
                ? <i className="fa-solid fa-circle-user" onClick={()=>setDisplayDiv(!displayDiv)} title="Opciones de cuenta"></i>
                : <img src={`/users_img/${user.profile.profilePic != null ? user.profile.profilePic : 'no-img.jpg'}`} alt="" onClick={()=>setDisplayDiv(!displayDiv)} title="Tu perfil"/>
=======
                ? <i className="fa-solid fa-circle-user" onClick={()=>setDisplayDiv(!displayDiv)}></i>
                : <img src={`/users_img/${user.profile.profilePic != null ? user.profile.profilePic : 'no-img.jpg'}`} alt="" onClick={()=>setDisplayDiv(!displayDiv)}/>
>>>>>>> b2b2cf4189ef85c0e5dfea594b9c8d7fd0f7d831
            }
            <div className={displayDiv ? 'open' : ''}>
                {routes.map(r =>
                    (isAuthenticated === r.isAuthenticated || r.isAuthenticated == null)
                    && (
                        r.name === 'Desconectarse'
<<<<<<< HEAD
                        ? <span onClick={handleLogOut} key={r.id} title={r.tooltip}>{r.name}</span>
                        : <NavLink key={r.id} to={r.route} onClick={()=>setDisplayDiv(false)} title={r.tooltip}>{r.name}</NavLink> 
=======
                        ? <span onClick={handleLogOut} key={r.id}>{r.name}</span>
                        : <NavLink key={r.id} to={r.route} onClick={()=>setDisplayDiv(false)}>{r.name}</NavLink> 
>>>>>>> b2b2cf4189ef85c0e5dfea594b9c8d7fd0f7d831
                    ) 
                )}
            </div>
        </div>
    );
};

export default UserIcon;