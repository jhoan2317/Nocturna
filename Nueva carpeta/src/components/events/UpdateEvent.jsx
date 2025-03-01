import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    rating: "",
    imgPath: "",
    category_id: "",
    brand_id: ""
  });
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8000/api/events/show/${id}`)
      .then((res) => {
        setFormData(res.data);
      })
      .catch((err) => {
        setError("Error al cargar el evento");
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.put(`http://localhost:8000/api/events/${id}`, formData);
      if (res.data.success) {
        navigate("/admins/dashboard/events");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error al actualizar el evento");
    }
  };

  return (
    <div className="content dashboardEvents">
      <h2>Update Event</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={formData.rating}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="imgPath"
          placeholder="Image Path"
          value={formData.imgPath}
          onChange={handleChange}
        />
        <input
          type="number"
          name="category_id"
          placeholder="Category ID"
          value={formData.category_id}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="brand_id"
          placeholder="Brand ID"
          value={formData.brand_id}
          onChange={handleChange}
          required
        />
        <button type="submit">Update Event</button>
      </form>
    </div>
  );
};

export default UpdateEvent;
