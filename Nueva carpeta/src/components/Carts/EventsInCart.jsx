import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const EventsInCart = () => {
    const dispatch = useDispatch();
    const eventsCart = useSelector(store => store.eventsCart);

    const deleteEvent = (event) => {
        dispatch( {type:'deleteEventFromCart', payload:{id:event.id}} )
    }
    
    const increment = (event) => {
        dispatch( {type:'increment', payload:{event:event}} )
    }
    
    const decrement = (event) => {
        dispatch( {type:'decrement', payload:{event:event}} )
    };

    return(
        <>
            <div className="att">
                <span>Order Details</span>
                <span>gender</span>
                <span>Quantity</span>
                <span>Price</span>
                <span>Total</span>
            </div>
            {eventsCart.map(event=>
                <div key={event.id} className="cart">
                    <span>
                        <Link to={`/events/show/${event.id}`}>
                            <img src={`/events_img/${event.imgPath}`} alt="event" />
                        </Link>
                        <div>
                            <p className='m-0'>{event.title}</p>
                            <p onClick={()=>deleteEvent(event)} className='m-0 remove text-danger'>delete</p>
                        </div>
                    </span>
                    <span>{event.gender}</span>
                    <span>
                        <button onClick={()=>decrement(event)}>-</button>
                        <p className='m-0'>{event.quantity}</p>
                        <button onClick={()=>increment(event)}>+</button>
                    </span>
                    <span className='fw-semibold'>{event.price} DH</span>
                    <span className='fw-semibold'>{event.total} DH</span>
                </div>
            )}
        </>
    )
}

export default EventsInCart;