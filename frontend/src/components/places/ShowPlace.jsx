import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../../partials/Spinner";
import ItemCard from "../events/itemCard";
import Comments from "../Comments/Comments";

const PlaceCard = ({ place }) => {
    return (
        <div className="place-card">
            <h2>{place.title}</h2>
            <img src={`/places_img/${place.imgPath}`} alt={place.title} className="place-image" />
            <p className="place-description">{place.description}</p>
            <p className="place-location"><strong>Ubicación:</strong> {place.location}</p>
            {place.category && (
                <p className="place-category"><strong>Categoría:</strong> {place.category.title}</p>
            )}
            <div className="place-map" style={{ height: '300px', width: '100%', marginTop: '20px' }}>
                <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(place.location)}&output=embed&markers=color:red`}
                    allowFullScreen>
                </iframe>
            </div>
        </div>
    );
};

const ShowPlace = () => {
    const [place, setPlace] = useState(null);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        console.log('Fetching place details for slug:', slug);
        setLoading(true);
        setError(null);
        
        // Obtenemos los detalles del lugar y sus eventos
        axios.get(`http://localhost:8000/api/places/${slug}`)
        .then(res => {
            console.log('Place data:', res.data);
            if (res.data && res.data.data) {
                setPlace(res.data.data);
                setEvents(res.data.data.events || []);
            } else if (res.data) {
                setPlace(res.data);
                setEvents(res.data.events || []);
            }
            setLoading(false);
        })
        .catch(err => {
            console.error('Error fetching place:', err.response?.data || err);
            setError(err.response?.data?.message || 'Error al cargar el lugar');
            setLoading(false);
        });
    }, [slug]);

    if (loading) {
        return (
            <div className="content flex-column align-items-center">
                <Spinner />
                <p className="mt-3">Cargando detalles del lugar...</p>
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

    if (!place) {
        return (
            <div className="content flex-column align-items-center">
                <div className="alert alert-warning">
                    No se encontró el lugar
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
            <PlaceCard place={place} />
            
            {events.length > 0 && (
                <div className="place-events mt-4">
                    <h3>Eventos en este lugar</h3>
                    <div className="events-grid">
                        {events.map(event => (
                            <ItemCard key={event.id} event={event} />
                        ))}
                    </div>
                </div>
            )}
            
            <div className="mt-4">
                <Comments id={place.id} type="place"/>
            </div>
        </div>
    )
}

export default ShowPlace; 