import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../../partials/Spinner";

const SavedEvents = () => {
    const isAuthenticated = useSelector(store => store.isAuthenticated)
    const savedEvents = useSelector(store => store.savedEvents);
    const navigate = useNavigate();
    const checkIsAuthenticated = () => {
        if(!isAuthenticated){
            navigate('/users/login')
        }
    }
    useEffect(()=>{
        checkIsAuthenticated();
    }, [])

    return(
        <div className="content savedEvents flex-column">
            <p className="m-4 text-muted fs-5 fw-semibold">Saved events :</p>
            <table style={{width: '95%'}} className="table table-hover mx-auto my-2">
                    <thead className="text-muted">
                        <tr>
                            <td>#</td>
                            <td>Perfil</td>
                            <td>Titulo</td>
                            <td>Genero</td>
                            <td>Precio</td>
                            <td>Color</td>
                            <td>Evento</td>
                        </tr>
                    </thead>
                    <tbody>
                        {savedEvents == null
                            ?   <tr><td colSpan={8}><Spinner/></td></tr>
                            :   (savedEvents.length === 0 
                                    ?   <tr><td colSpan={8} className="text-center p-4">No Saved Events</td></tr> 
                                    :   savedEvents.map( savedEvent =>
                                        <tr key={savedEvent.id}>
                                            <td>{savedEvent.event.id}</td>
                                            <td>
                                                <Link to={`/events/show/${savedEvent.event.id}`}>
                                                    <img src={`/events_img/${savedEvent.event.imgPath}`} alt="event" />
                                                </Link>
                                            </td>
                                            <td>{savedEvent.event.title}</td>
                                            <td>{savedEvent.event.gender}</td>
                                            <td>{savedEvent.event.price}</td>
                                            <td>{savedEvent.event.color}</td>
                                            <td>{savedEvent.event.brand.title}</td>
                                        </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
        </div>
    )
}

export default SavedEvents;