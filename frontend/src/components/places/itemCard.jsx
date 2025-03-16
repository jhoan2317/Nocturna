import React from "react";
import { NavLink } from "react-router-dom";
import "../../storage/css/ItemCard.css";

const ItemCard = ({event: place}) => {
    // No mostrar errores en consola
    if (!place || !place.slug) {
        return null;
    }

    // Imagen de fallback en caso de error
    const fallbackImage = "/placeholder.jpg";

    const handleImageError = (e) => {
        // Prevenir la propagación del evento para que no aparezca en consola
        e.preventDefault();
        e.stopPropagation();
        
        // Silenciosamente cambiar a la imagen de fallback
        if (e.target.src !== fallbackImage) {
            e.target.src = fallbackImage;
        }
    };

    return (
        <div className="item-card">
            <img 
                src={place.imgPath ? `/places_img/${place.imgPath}` : fallbackImage} 
                alt={place.title || "Lugar"} 
                className="item-card-img"
                onError={handleImageError}
            />
            <div className="item-card-body">
                <h3 className="item-card-title">{place.title}</h3>
                <p className="item-card-description">{place.description}</p>
                <p className="item-card-location">{place.location}</p>
                <NavLink to={`/places/show/${place.slug}`} className="item-card-link">
                    Vista
                </NavLink>
            </div>
        </div>
    )
}

export default ItemCard; 