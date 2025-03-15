import React from "react";
import { Link } from "react-router-dom";

const ShowEventCard = ({ event }) => {
    return (
        <div className="event-card">
            <div className="event-card-header">
                <img src={`/events_img/${event.imgPath}`} alt={event.title} />
            </div>
            <div className="event-card-body">
                <h3>{event.title}</h3>
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
        </div>
    );
};

export default ShowEventCard;