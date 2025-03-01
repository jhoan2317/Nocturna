import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEvent = () => {
  const navigate = useNavigate();
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
  const [selectedLocation, setSelectedLocation] = useState(null);
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
        navigate("/admins/dashboard/events");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error al crear el evento");
    }
  };

  return (
    <div className="content dashboardEvents" style={{ padding: "-40px" }}>
      <h2 style={{ textAlign: "center" }}>Create Event</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3" style={{ marginBottom: "1rem" }}>
          <label className="form-label">Title</label>
          <input 
            type="text" 
            name="title" 
            placeholder="Enter event title" 
            value={formData.title} 
            onChange={handleChange} 
            className="form-control" 
            required 
          />
        </div>
        <div className="mb-3" style={{ marginBottom: "1rem" }}>
          <label className="form-label">Description</label>
          <textarea 
            name="description" 
            placeholder="Enter a detailed description" 
            value={formData.description} 
            onChange={handleChange} 
            className="form-control" 
            required 
          />
        </div>
        <div className="mb-3" style={{ marginBottom: "1rem" }}>
          <label className="form-label">Location</label>
          <input 
            type="text" 
            name="location" 
            placeholder="Enter event location" 
            value={formData.location} 
            onChange={handleChange} 
            className="form-control" 
            required 
          />
        </div>
        <div className="mb-3" style={{ marginBottom: "1rem" }}>
          <label className="form-label">Price</label>
          <input 
            type="number" 
            name="price" 
            placeholder="Enter event price" 
            value={formData.price} 
            onChange={handleChange} 
            className="form-control" 
            required 
          />
        </div>
        <div className="mb-3" style={{ marginBottom: "1rem" }}>
          <label className="form-label">Rating</label>
          <input 
            type="number" 
            name="rating" 
            placeholder="Enter event rating (e.g., 4.5)" 
            value={formData.rating} 
            onChange={handleChange} 
            className="form-control" 
            required 
          />
        </div>
        <div className="mb-3" style={{ marginBottom: "1rem" }}>
          <label className="form-label">Image</label>
          <input 
            type="file" 
            name="imgPath" 
            onChange={handleImageChange} 
            className="form-control" 
          />
          {imagePreview && <img src={imagePreview} alt="Preview" style={{ marginTop: "10px", maxWidth: "30%", height: "auto" }} />}
        </div>
        <div className="mb-3" style={{ marginBottom: "1rem" }}>
          <label className="form-label">Category</label>
          <select 
            name="category_id" 
            value={formData.category_id} 
            onChange={handleChange} 
            className="form-select" 
            required
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.title}</option>
            ))}
          </select>
        </div>
        <div className="mb-3" style={{ marginBottom: "1rem" }}>
          <label className="form-label">Brand</label>
          <select 
            name="brand_id" 
            value={formData.brand_id} 
            onChange={handleChange} 
            className="form-select" 
            required
          >
            <option value="">Select a brand</option>
            {brands.map(brand => (
              <option key={brand.id} value={brand.id}>{brand.title}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default AddEvent;