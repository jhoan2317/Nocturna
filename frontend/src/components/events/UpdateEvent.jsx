import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateEvent = ({ event, closeModal, onSuccess }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const [rating, setRating] = useState("");
    const [brandId, setBrandId] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (event) {
            setTitle(event.title);
            setDescription(event.description);
            setLocation(event.location);
            setPrice(event.price);
            setRating(event.rating);
            setBrandId(event.brand.id);
            setCategoryId(event.category.id);
        }
    }, [event]);

    useEffect(() => {
        const fetchBrandsAndCategories = async () => {
            try {
                const brandsRes = await axios.get("http://localhost:8000/api/brands");
                setBrands(brandsRes.data);
                const categoriesRes = await axios.get("http://localhost:8000/api/categories");
                setCategories(categoriesRes.data);
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchBrandsAndCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:8000/api/events/${event.id}`, {
                title,
                description,
                location,
                price,
                rating,
                brand_id: brandId,
                category_id: categoryId,
            });
            if (res.data.success) {
                onSuccess();
                closeModal();
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div className="update-event-modal">
            <div className="left-side">
                <h2>Actualizar Evento</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Título</label>
                        <input
                            type="text"
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Descripción</label>
                        <textarea
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Ubicación</label>
                        <input
                            type="text"
                            className="form-control"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Precio</label>
                        <input
                            type="number"
                            className="form-control"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Puntaje</label>
                        <input
                            type="number"
                            className="form-control"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Marca</label>
                        <select
                            className="form-control"
                            value={brandId}
                            onChange={(e) => setBrandId(e.target.value)}
                        >
                            {brands.map((brand) => (
                                <option key={brand.id} value={brand.id}>
                                    {brand.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Categoría</label>
                        <select
                            className="form-control"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                        >
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Actualizar
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={closeModal}>
                        Cancelar
                    </button>
                </form>
            </div>
            <div className="right-side">
                <h2>Información del Evento</h2>
                <p><strong>Título:</strong> {event.title}</p>
                <p><strong>Descripción:</strong> {event.description}</p>
                <p><strong>Ubicación:</strong> {event.location}</p>
                <p><strong>Precio:</strong> {event.price}</p>
                <p><strong>Puntaje:</strong> {event.rating}</p>
                <p><strong>Marca:</strong> {event.brand.title}</p>
                <p><strong>Categoría:</strong> {event.category.title}</p>
                {event.imgPath && (
                    <img src={`/events_img/${event.imgPath}`} alt="event" style={{ width: "100%", height: "auto" }} />
                )}
            </div>
        </div>
    );
};

export default UpdateEvent;