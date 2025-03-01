import React, { useState } from "react";
import axios from "axios";

const UpdateCategory = ({ category, closeModal, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: category.title
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
      const res = await axios.put(`http://localhost:8000/api/categories/${category.id}`, formData);
      if (res.data.success) {
        onSuccess("Categoría actualizada con éxito");
        closeModal();
      } else {
        setError("Error al actualizar la categoría");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error al actualizar la categoría");
    }
  };

  return (
    <div className="content dashboardCategories">
      <h2>Actualizar Categoría</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <button type="submit">Actualizar Categoría</button>
        <button type="button" onClick={closeModal}>Cancelar</button>
      </form>
    </div>
  );
};

export default UpdateCategory;