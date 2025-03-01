import React, { useState } from "react";
import axios from "axios";

const UpdateBrand = ({ brand, closeModal, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: brand.title
  });
  const [error, setError] = useState("");

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
      const res = await axios.put(`http://localhost:8000/api/brands/${brand.id}`, formData);
      if (res.data.success) {
        onSuccess();
        closeModal();
      } else {
        setError("Error al actualizar la marca");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error al actualizar la marca");
    }
  };

  return (
    <div className="content dashboardBrands">
      <h2>Actualizar Marca</h2>
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
        <button type="submit">Actualizar Marca</button>
        <button type="button" onClick={closeModal}>Cancelar</button>
      </form>
    </div>
  );
};

export default UpdateBrand;