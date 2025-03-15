import React from "react";
import { NavLink } from "react-router-dom";

const ItemCard = ({event: place}) => {
    console.log('Place data in ItemCard:', place);

    if (!place || !place.slug) {
        console.error('Invalid place data:', place);
        return null;
    }

    return (
        <div className="item-card">
            <img 
                src={`/places_img/${place.imgPath}`} 
                alt={place.title} 
                className="item-card-img"
                onError={(e) => {
                    console.log('Error loading image:', e);
                    e.target.src = '/placeholder.jpg';
                }}
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