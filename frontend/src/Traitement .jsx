import React, { useEffect }  from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

const Traitement = () => {
    const dispatch = useDispatch();
    const eventsCart = useSelector(store => store.eventsCart);
    // const isAuthenticated = useSelector(store => store.isAuthenticated);
    // const user = useSelector(store => store.user);

    useEffect(()=>{
        document.cookie = `cookie_name=cookie_value; SameSite=None; Secure`;

        const token = Cookies.get('token');
        dispatch( {type:'setIsAuthenticated', payload:{case: !!token}} )
        // console.log(!!token);

        // events
        axios.get('http://localhost:8000/api/events')
        .then(res => dispatch({type:'setEvents', payload:{events:res.data}}) )
        .catch(err => console.error(err))
        
        //brands
        axios.get('http://localhost:8000/api/brands')
        .then(res => dispatch({type:'setBrands', payload:{brands:res.data}}) )
        .catch(err => console.error(err))

        // eventsCart from localStorage
        const T = window.localStorage.events;
        if(T) dispatch( {type:'setEventsCart', payload:{data: JSON.parse(T)}} );
        else dispatch( {type:'setEventsCart', payload:{data: []}} );
    }, [])

    useEffect(()=>{
        const newT = JSON.stringify(eventsCart);
        window.localStorage.events = newT;
    }, [eventsCart])

    useEffect(()=>{
        // user
        const user = window.localStorage.user;
        if(user) dispatch( {type:'setUser', payload:{user: JSON.parse(user)}} );
        else dispatch( {type:'setUser', payload:{user}} );
    }, [])

    useEffect(()=>{
        // savesEvents
        const user = window.localStorage.user;
        if(user){
            axios.get(`http://localhost:8000/api/savedEvents/${JSON.parse(user).id}`)
            .then(res => dispatch({type:'setSavedEvents', payload:{data:res.data}}))
            .catch(err => console.error(err))
        }
    }, [])
}

export default Traitement;