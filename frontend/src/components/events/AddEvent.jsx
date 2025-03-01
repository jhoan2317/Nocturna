import React, { useState, useEffect } from "react";
import axios from "axios";

const AddEvent = ({ closeModal, onSuccess }) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    rating: "",
    imgPath: null, // Cambia a null para almacenar el objeto File
    category_id: "",
    brand_id: ""
  });
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null); // Estado para la previsualización de la imagen

  useEffect(() => {
    // Cargar categorías y marcas desde la API
    axios.get("http://localhost:8000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));

    axios.get("http://localhost:8000/api/brands")
      .then((res) => setBrands(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imgPath: file }); // Almacena el objeto File
      setImagePreview(URL.createObjectURL(file)); // Crea una URL para la previsualización
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      const res = await axios.post("http://localhost:8000/api/events", formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (res.data.success) {
        onSuccess();
        setFormData({
          title: "",
          description: "",
          location: "",
          price: "",
          rating: "",
          imgPath: null,
          category_id: "",
          brand_id: ""
        });
        setImagePreview(null);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error al crear el evento");
    }
  };

  return (
    <div className="add-event-modal">
      <div className="left-side">
        <h2>Crear Evento</h2>
        {error && <p className="text-danger">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título</label>
            <input 
              type="text" 
              name="title" 
              placeholder="Introduce el título del evento" 
              value={formData.title} 
              onChange={handleChange} 
              className="form-control" 
              required 
            />
          </div>
          <div className="form-group">
            <label>Descripción</label>
            <textarea 
              name="description" 
              placeholder="Introduce una descripción detallada" 
              value={formData.description} 
              onChange={handleChange} 
              className="form-control" 
              required 
            ></textarea>
          </div>
          <div className="form-group">
            <label>Ubicación</label>
            <input 
              type="text" 
              name="location" 
              placeholder="Introduce la ubicación del evento" 
              value={formData.location} 
              onChange={handleChange} 
              className="form-control" 
              required 
            />
          </div>
          <div className="form-group">
            <label>Precio</label>
            <input 
              type="number" 
              name="price" 
              placeholder="Introduce el precio del evento" 
              value={formData.price} 
              onChange={handleChange} 
              className="form-control" 
              required 
            />
          </div>
          <div className="form-group">
            <label>Puntaje</label>
            <input 
              type="number" 
              name="rating" 
              placeholder="Introduce el puntaje del evento (ej., 4.5)" 
              value={formData.rating} 
              onChange={handleChange} 
              className="form-control" 
              required 
            />
          </div>
          <div className="form-group">
            <label>Imagen</label>
            <input 
              type="file" 
              name="imgPath" 
              onChange={handleImageChange} 
              className="form-control" 
            />
          </div>
          <div className="form-group">
            <label>Categoría</label>
            <select 
              name="category_id" 
              value={formData.category_id} 
              onChange={handleChange} 
              className="form-select" 
              required
            >
              <option value="">Selecciona una categoría</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.title}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Marca</label>
            <select 
              name="brand_id" 
              value={formData.brand_id} 
              onChange={handleChange} 
              className="form-select" 
              required
            >
              <option value="">Selecciona una marca</option>
              {brands.map(brand => (
                <option key={brand.id} value={brand.id}>{brand.title}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Crear Evento
          </button>
          <button type="button" className="btn btn-secondary" onClick={closeModal}>
            Cancelar
          </button>
        </form>
      </div>
      <div className="right-side">
        <h2>Previsualización de la Imagen</h2>
        {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: "100%", height: "auto" }} />}
      </div>
    </div>
  );
};

export default AddEvent;