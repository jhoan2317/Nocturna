import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ItemCard from "./itemCard";

const ItemsCard = ({events, brand = null, state, slug}) => {
    const [data, setData] = useState([]);

    useEffect(()=>{
        console.log('Places received:', events);
        console.log('Category title:', brand);
        
        if(brand != null && Array.isArray(events)){
            // Filtramos los lugares que pertenecen a esta categoría
            const filteredPlaces = events.filter(place => {
                console.log('Place:', place);
                console.log('Place category:', place.category?.title);
                return place.category?.title === brand;
            });
            
            console.log('Filtered places for', brand, ':', filteredPlaces);
            setData(filteredPlaces);
        } else {
            setData(events || []);
        }
    }, [brand, events]);

    const homeItems = <>
            {data && data.length > 0 ? (
                <>
                    {data.map((place,i) => i<3 && (
                        <ItemCard event={place} key={place.id} />
                    ))}
                    <div className="btnParent">
                        <NavLink className="btn" to={`/categories/${slug}`}>Ver más ...</NavLink>
                    </div>
                </>
            ) : (
                <p>No hay lugares disponibles para esta categoría.</p>
            )}
    </>

    const allItems = <>
        {data && data.length > 0 ? (
            data.map(place =>
                <ItemCard event={place} key={place.id} />
            )
        ) : (
            <p>No hay lugares disponibles para esta categoría.</p>
        )}
    </>

    return(
        <div className="items">
            {state==='home' 
                ?   homeItems
                :   allItems
            }
        </div>
    )
}

export default ItemsCard;