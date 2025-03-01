import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

const Traitement = () => {
    const dispatch = useDispatch();
    const eventsCart = useSelector(store => store.eventsCart);

    useEffect(() => {
        document.cookie = `cookie_name=cookie_value; SameSite=None; Secure`;

        const token = Cookies.get('token');
        dispatch({ type: 'setIsAuthenticated', payload: { case: !!token } });

        // events
        axios.get('http://localhost:8000/api/events')
            .then(res => dispatch({ type: 'setEvents', payload: { events: res.data } }))
            .catch(err => console.error(err));

        // brands
        axios.get('http://localhost:8000/api/brands')
            .then(res => dispatch({ type: 'setBrands', payload: { brands: res.data } }))
            .catch(err => console.error(err));

        // eventsCart from localStorage
        const T = window.localStorage.events;
        if (T) dispatch({ type: 'setEventsCart', payload: { data: JSON.parse(T) } });
        else dispatch({ type: 'setEventsCart', payload: { data: [] } });
    }, [dispatch]);

    useEffect(() => {
        const newT = JSON.stringify(eventsCart);
        window.localStorage.events = newT;
    }, [eventsCart]);

    useEffect(() => {
        // user
        const user = window.localStorage.user;
        if (user) dispatch({ type: 'setUser', payload: { user: JSON.parse(user) } });
        else dispatch({ type: 'setUser', payload: { user } });
    }, [dispatch]);

    useEffect(() => {
        // savedEvents
        const user = window.localStorage.user;
        if (user) {
            const userId = JSON.parse(user).id;
            axios.get(`http://localhost:8000/api/savedEvents/${userId}`)
                .then(res => dispatch({ type: 'setSavedEvents', payload: { data: res.data } }))
                .catch(err => console.error(err));
        }
    }, [dispatch, eventsCart]);
}

export default Traitement;