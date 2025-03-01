import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ItemCard from "./itemCard";

const ItemsCard = ({events, brand = null, state}) => {
    const [data, setData] = useState([]);

    useEffect(()=>{
        // console.log(brand);
        if(brand!=null){
            setData( events.filter(event=>event.brand.title === brand) );
        }
    }, []);

    const homeItems = <>
            {data.map((event,i) => i<3
                    && <ItemCard event={event} key={event.id} />
                )}
            <div className="btnParent">
                <NavLink className="btn" to={`/brands/${brand}`}>More ...</NavLink>
            </div>
    </>

    const allItems = <>
        {data.map(event =>
            <ItemCard event={event} key={event.id} />
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