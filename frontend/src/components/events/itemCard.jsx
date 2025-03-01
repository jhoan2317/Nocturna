import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import "../../storage/css/ItemCard.css";

const ItemCard = ({ event }) => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(store => store.isAuthenticated);
    const user = useSelector(store => store.user);
    const navigate = useNavigate();
    const savedEvents = useSelector(store => store.savedEvents);
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = async () => {
        if (isAuthenticated) {
            if (!isSaved) {
                try {
                    const res = await axios.post('http://localhost:8000/api/savedEvents/store', { user_id: user.id, event_id: event.id });
                    if (res.data.success) {
                        setIsSaved(true);
                        dispatch({ type: 'setSavedEvents', payload: { data: res.data.savedEvents } });
                    }
                } catch (e) {
                    console.log(e.message);
                }
            } else {
                try {
                    const res = await axios.delete(`http://localhost:8000/api/savedEvents/destroy/${event.id}/${user.id}`);
                    if (res.data.success) {
                        setIsSaved(false);
                        dispatch({ type: 'setSavedEvents', payload: { data: res.data.savedEvents } });
                    }
                } catch (e) {
                    console.log(e.message);
                }
            }
        } else {
            navigate('/users/login');
        }
    };

    useEffect(() => {
        if (savedEvents.length > 0) {
            const isS = savedEvents.some(sv => sv.event_id === event.id);
            setIsSaved(isS);
        }
    }, [savedEvents, event.id]);

    return (
        <div className="item-card">
            <img src={`/events_img/${event.imgPath}`} alt={event.title} className="item-card-img" />
            <div className="item-card-body">
                <i onClick={() => handleSave()} className={isSaved ? 'fa-solid fa-heart text-danger' : 'fa-regular fa-heart'}></i>
                <h3 className="item-card-title">{event.title}</h3>
                <p className="item-card-rating">
                    <i className="fa-solid fa-star" style={{ color: "gold" }}></i> <span>{event.rating}</span>
                </p>
                <p className="item-card-price">{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(event.price)}</p>
                <NavLink to={`/events/show/${event.id}`} className="item-card-link">Vista</NavLink>
            </div>
        </div>
    );
};

export default ItemCard;