import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../../partials/Spinner";
import Comments from "../Comments/Comments";

const ShowEvent = () => {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        console.log('Fetching event details for ID:', id);
        setLoading(true);
        setError(null);
        
        axios.get(`http://localhost:8000/api/events/${id}`)
        .then(res => {
            console.log('Event data:', res.data);
            if (res.data && res.data.data) {
                setEvent(res.data.data);
            } else if (res.data) {
                setEvent(res.data);
            }
            setLoading(false);
        })
        .catch(err => {
            console.error('Error fetching event:', err.response?.data || err);
            setError(err.response?.data?.message || 'Error al cargar el evento');
            setLoading(false);
        });
    }, [id]);

    if (loading) {
        return (
            <div className="content flex-column align-items-center">
                <Spinner />
                <p className="mt-3">Cargando detalles del evento...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="content flex-column align-items-center">
                <div className="alert alert-danger">
                    {error}
                    <button 
                        className="btn btn-link" 
                        onClick={() => navigate('/')}
                    >
                        Volver al inicio
                    </button>
                </div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="content flex-column align-items-center">
                <div className="alert alert-warning">
                    No se encontró el evento
                    <button 
                        className="btn btn-link" 
                        onClick={() => navigate('/')}
                    >
                        Volver al inicio
                    </button>
                </div>
            </div>
        );
    }

    return(
        <div className="content flex-column align-items-center">
            <div className="event-details">
                <div className="event-header">
                    <h2>{event.title}</h2>
                    <img src={`/events_img/${event.imgPath}`} alt={event.title} className="event-image" />
                </div>
                
                <div className="event-info mt-4">
                    <p className="event-description">{event.description}</p>
                    <p className="event-capacity"><strong>Capacidad:</strong> {event.capacity} personas</p>
                    <p className="event-price">
                        <strong>Precio:</strong> {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(event.price)}
                    </p>
                    {event.rating && (
                        <p className="event-rating">
                            <strong>Calificación:</strong> <i className="fa-solid fa-star" style={{ color: "gold" }}></i> {event.rating}
                        </p>
                    )}
                </div>

                {event.place && (
                    <div className="event-place mt-4">
                        <h3>Ubicación</h3>
                        <p><strong>Lugar:</strong> <Link to={`/places/show/${event.place.id}`}>{event.place.title}</Link></p>
                        <p><strong>Dirección:</strong> {event.place.location}</p>
                        <div className="place-map" style={{ height: '300px', width: '100%', marginTop: '20px' }}>
                            <iframe
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                style={{ border: 0 }}
                                src={`https://www.google.com/maps?q=${encodeURIComponent(event.place.location)}&output=embed&markers=color:red`}
                                allowFullScreen>
                            </iframe>
                        </div>
                    </div>
                )}
            </div>
            
            <div className="mt-4">
                <Comments id={event.id}/>
            </div>
        </div>
    )
}

export default ShowEvent;