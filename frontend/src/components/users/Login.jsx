import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Configuración de axios optimizada
const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true
});

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(store => store.isAuthenticated);

    // Verificar estado de sesión
    const checkAuthStatus = async () => {
        try {
            const res = await api.get('/api/check-auth');
            if (!res.data.authenticated) {
                // Si no está autenticado en el backend, limpiar estado frontend
                dispatch({ type: 'setIsAuthenticated', payload: { case: false } });
                dispatch({ type: 'setUser', payload: { user: null } });
                dispatch({ type: 'setSavedEvents', payload: { data: [] } });
                window.localStorage.removeItem('user');
                Cookies.remove('token', { path: '/' });
            }
        } catch (error) {
            // Si hay error, asumir que no está autenticado
            dispatch({ type: 'setIsAuthenticated', payload: { case: false } });
            dispatch({ type: 'setUser', payload: { user: null } });
            window.localStorage.removeItem('user');
            Cookies.remove('token', { path: '/' });
        }
    };

    useEffect(() => {
        // Verificar estado inicial
        checkAuthStatus();

        // Verificar estado cada 30 segundos
        const interval = setInterval(checkAuthStatus, 30000);

        return () => clearInterval(interval);
    }, []);

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
            const res = await api.post('/api/users/login', data.current);
            const { success, redirect, user, savedEvents, isAdmin } = res.data;

            if (success) {
                if (redirect) {
                    // Si hay una URL de redirección, ir allí (caso admin)
                    window.location.replace(redirect);
                } else {
                    // Usuario normal
                    dispatch({ type: 'setIsAuthenticated', payload: { case: true } });
                    dispatch({ type: 'setUser', payload: { user } });
                    dispatch({ type: 'setSavedEvents', payload: { data: savedEvents } });
                    window.localStorage.setItem('user', JSON.stringify(user));
                    navigate('/');
                }
            } else {
                setError('Esta cuenta está bloqueada, no puedes acceder.');
            }
        } catch (e) {
            console.error("Error en login:", e.response?.data || e.message);
            setError('La combinación de correo electrónico y contraseña es inválida.');
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
