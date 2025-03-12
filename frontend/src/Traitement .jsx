import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import api from './axios/axios';

const Traitement = () => {
    const dispatch = useDispatch();
    const eventsCart = useSelector(store => store.eventsCart);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                // Primero obtenemos el token CSRF
                await api.get('http://localhost:8000/sanctum/csrf-cookie');
                
                const token = Cookies.get('token');
                if (token) {
                    const res = await api.get('/api/check-auth');
                    if (res.data.authenticated) {
                        dispatch({ type: 'setIsAuthenticated', payload: { case: true } });
                        const user = window.localStorage.getItem('user');
                        if (user) {
                            const userData = JSON.parse(user);
                            dispatch({ type: 'setUser', payload: { user: userData } });
                            
                            // Si es admin y no estamos ya en el panel de administración
                            if (userData.role === 'admin' && !window.location.href.includes('/admin')) {
                                window.location.replace('http://localhost:8000/admin');
                                return;
                            }
                            
                            // Solo cargar eventos guardados para usuarios normales
                            if (userData.role !== 'admin') {
                                try {
                                    const savedEventsRes = await api.get(`/api/savedEvents/user/${userData.id}`);
                                    if (savedEventsRes.data.success) {
                                        dispatch({ type: 'setSavedEvents', payload: { data: savedEventsRes.data.savedEvents } });
                                    }
                                } catch (error) {
                                    console.error('Error loading saved events:', error);
                                }
                            }
                        }
                    } else {
                        // Si no está autenticado y estamos en una ruta de admin
                        if (window.location.href.includes('/admin')) {
                            window.location.replace('http://localhost:8000/admin/login');
                            return;
                        }
                        dispatch({ type: 'logout' });
                        Cookies.remove('token', { path: '/' });
                        window.localStorage.removeItem('user');
                    }
                } else if (window.location.href.includes('/admin')) {
                    window.location.replace('http://localhost:8000/admin/login');
                    return;
                }

                // Solo cargar datos iniciales si no estamos en el panel de admin
                if (!window.location.href.includes('/admin')) {
                    try {
                        const [eventsRes, brandsRes] = await Promise.all([
                            api.get('/api/events'),
                            api.get('/api/brands')
                        ]);

                        dispatch({ type: 'setEvents', payload: { events: eventsRes.data } });
                        dispatch({ type: 'setBrands', payload: { brands: brandsRes.data } });

                        // Load cart from localStorage
                        const cartData = window.localStorage.getItem('events');
                        if (cartData) {
                            dispatch({ type: 'setEventsCart', payload: { data: JSON.parse(cartData) } });
                        }
                    } catch (error) {
                        console.error('Error loading initial data:', error);
                    }
                }
            } catch (error) {
                console.error('Error in initialization:', error);
                if (window.location.href.includes('/admin')) {
                    window.location.replace('http://localhost:8000/admin/login');
                    return;
                }
                dispatch({ type: 'logout' });
                Cookies.remove('token', { path: '/' });
                window.localStorage.removeItem('user');
            }
        };

        initializeAuth();
    }, [dispatch]);

    // Save cart to localStorage when it changes (solo para usuarios no admin)
    useEffect(() => {
        if (!window.location.href.includes('/admin')) {
            window.localStorage.setItem('events', JSON.stringify(eventsCart));
        }
    }, [eventsCart]);

    return null;
};

export default Traitement;