import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(store => store.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const [error, setError] = useState('');
    const data = useRef({ email: '', password: '' });

    const handleInput = (input) => {
        data.current[input.name] = input.value;
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/api/users/login', data.current);
            const { token, user, success, savedEvents } = res.data;
    
            if (success) {
                dispatch({ type: 'setIsAuthenticated', payload: { case: true } });
                window.localStorage.setItem('user', JSON.stringify(user));
                dispatch({ type: 'setUser', payload: { user } });
                dispatch({ type: 'setSavedEvents', payload: { data: savedEvents } });
    
                Cookies.set('token', token, { expires: 10, sameSite: 'none', secure: true });
    
                console.log("Usuario logueado:", user); // 👀 Depuración
    
                // Asegurar que user.role existe
                if (user && user.role) {
                    const role = user.role.toLowerCase(); // Normalizamos el rol
    
                    if (role === 'admin') {
                        navigate('/admins/dashboard');
                    } else {
                        navigate('/');
                    }
                } else {
                    console.error("Error: No se recibió el rol del usuario.");
                    navigate('/'); // Redirigir al home si no se obtiene el rol
                }
            } else {
                setError('Esta cuenta está bloqueada, no puedes acceder.');
            }
        } catch (e) {
            setError('La combinación de correo electrónico y contraseña es inválida.');
            console.error("Error en login:", e.message);
        }
    };
    

    return (
        <div style={{ height: '90vh' }} className="content flex-column justify-content-center">
            <form onSubmit={handleLogin} method="post" style={{ width: '450px' }} className="p-4 mt-1 mx-auto rounded bg-light">
                <h2 className="mx-2 p-2">Inicio de sesión</h2>
                <p className="emptyError Error fw-semibold text-danger">{error}</p>
                <p className="fs-5 py-2 px-3">Bienvenido a Popayán Nocturna. ¡Inicia sesión para continuar!</p>
                <div className="my-1 py-2 px-3">
                    <label>Correo electrónico</label>
                    <input onChange={(e) => handleInput(e.target)} type="email" name="email" className="email form-control px-3 col-12 att" />
                </div>

                <div style={{ position: 'relative' }} className="my-1 py-2 px-3">
                    <label>Contraseña</label>
                    <input onChange={(e) => handleInput(e.target)} type="password" name="password" className="password att form-control ps-3 pe-5 col-12" />
                </div>

                <div className="btnParent d-flex justify-content-end my-1 py-2 px-3">
                    <button style={{ padding: '14px 0' }} type="submit" name="login" className="btn col-12 btn-dark rounded-1">Ingreso</button>
                </div>
                <div className="text-end px-3">
    <Link to="/forgot-password" className="text-primary">¿Olvidaste tu contraseña?</Link>
</div>
            </form>
        </div>
    );
};

export default Login;
