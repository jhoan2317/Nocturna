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
                            
                            // Manejar redirecciones según el rol
                            if (window.location.href.includes('/admin')) {
                                if (!['admin', 'client'].includes(userData.role)) {
                                    // Solo redirigir si no es ni admin ni client
                                    window.location.replace('http://localhost:3000');
                                    return;
                                }
                            } else if (['admin', 'client'].includes(userData.role)) {
                                // Redirigir al panel admin si el usuario es admin o client
                                window.location.replace('http://localhost:8000/admin');
                                return;
                            }
                            
                            // Cargar eventos guardados para usuarios que no son admin
                            if (userData.role !== 'admin') {
                                try {
                                    const savedEventsRes = await api.get(`/api/saved-events/user/${userData.id}`);
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
                        const [eventsRes, categoriesRes] = await Promise.all([
                            api.get('/api/places?include=category'),
                            api.get('/api/categories')
                        ]);

                        console.log('API Response - Events:', eventsRes.data);
                        console.log('API Response - Categories:', categoriesRes.data);

                        // Asignar la categoría a cada evento basado en category_id
                        const events = eventsRes.data.data.map(event => {
                            const category = categoriesRes.data.data.find(
                                cat => cat.id === event.category_id
                            );
                            return {
                                ...event,
                                category
                            };
                        });

                        dispatch({ type: 'setEvents', payload: { events: { data: events } } });
                        dispatch({ type: 'setCategories', payload: { categories: categoriesRes.data } });

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