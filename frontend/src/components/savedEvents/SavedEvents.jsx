import React, { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../../partials/Spinner";

const SavedEvents = () => {
    const isAuthenticated = useSelector(store => store.isAuthenticated);
    const savedEvents = useSelector(store => store.savedEvents);
    const navigate = useNavigate();

    const checkIsAuthenticated = () => {
        if (!isAuthenticated) {
            navigate('/users/login');
        }
    };

    useEffect(() => {
        checkIsAuthenticated();
    }, []);

    return (
        <div className="content savedEvents flex-column">
            <p className="m-4 text-muted fs-5 fw-semibold">Preferencias:</p>
            <table style={{ width: '95%' }} className="table table-hover mx-auto my-2">
                <thead className="text-muted">
                    <tr>
                        <td>#</td>
                        <td>Perfil</td>
                        <td>Título</td>
                        <td>Descripción</td>
                        <td>Ubicación</td>
                        <td>Precio</td>
                        <td>Calificación</td>
                        <td>Categoría</td>
                        <td>Marca</td>
                    </tr>
                </thead>
                <tbody>
                    {savedEvents == null
                        ? <tr><td colSpan={9}><Spinner /></td></tr>
                        : (savedEvents.length === 0
                            ? <tr><td colSpan={9} className="text-center p-4">Sin preferencias</td></tr>
                            : savedEvents.map(savedEvent =>
                                <tr key={savedEvent.id}>
                                    <td>{savedEvent.event.id}</td>
                                    <td>
                                        <Link to={`/events/show/${savedEvent.event.id}`}>
                                            <img src={`/events_img/${savedEvent.event.imgPath}`} alt="event" />
                                        </Link>
                                    </td>
                                    <td>{savedEvent.event.title}</td>
                                    <td>{savedEvent.event.description}</td>
                                    <td>{savedEvent.event.location}</td>
                                    <td>{savedEvent.event.price}</td>
                                    <td>{savedEvent.event.rating}</td>
                                    <td>{savedEvent.event.category.title}</td>
                                    <td>{savedEvent.event.brand.title}</td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default SavedEvents;