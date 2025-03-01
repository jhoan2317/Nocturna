import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const ShowEventCard = ({ event }) => {
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
        <div className="eventCard">
            <div className="eventCard-header">
                <i onClick={() => handleSave()} className={isSaved ? 'fa-solid fa-heart text-danger' : 'fa-regular fa-heart'}></i>
                <img src={`/events_img/${event.imgPath}`} alt={event.title} />
            </div>
            <div className="eventCard-body">
                <h2>{event.title}</h2>
                <p>Marca: <Link to={`/brands/${event.brand.title}`}>{event.brand.title}</Link></p>
                <p>Categoría: <Link to={`/categories/${event.category.title}`}>{event.category.title}</Link></p>
                <p>Descripción: {event.description}</p>
                <p>Ubicación: {event.location}</p>
                <p>Precio: {event.price} COP</p>
                <p>Calificación: <i className="fa-solid fa-star" style={{ color: "gold" }}></i> <span>{event.rating}</span></p>
                <div className="eventCard-map" style={{ height: '200px', width: '100%' }}>
                    <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        style={{ border: 0 }}
                        src={`https://www.google.com/maps?q=${encodeURIComponent(event.location)}&output=embed&markers=color:red`}
                        allowFullScreen>
                    </iframe>
                </div>
            </div>
        </div>
    );
};

export default ShowEventCard;