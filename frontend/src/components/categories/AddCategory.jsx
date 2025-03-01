import React, { useState } from "react";
import axios from "axios";

const AddCategory = ({ closeModal, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: ""
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
      const res = await axios.post("http://localhost:8000/api/categories", formData);
      if (res.data.success) {
        onSuccess("Categoría agregada con éxito");
        closeModal();
      } else {
        setError("Error al agregar la categoría");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error al agregar la categoría");
    }
  };

  return (
    <div className="content dashboardCategories">
      <h2>Agregar Categoría</h2>
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
        <button type="submit">Agregar Categoría</button>
        <button type="button" onClick={closeModal}>Cancelar</button>
      </form>
    </div>
  );
};

export default AddCategory;