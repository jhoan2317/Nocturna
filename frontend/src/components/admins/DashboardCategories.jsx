import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import AddCategory from "../categories/AddCategory"; // Importar el componente AddCategory
import UpdateCategory from "../categories/UpdateCategory"; // Importar el componente UpdateCategory
import DashboardLeftSide from "./DashboardLeftSide"; // Importar el componente DashboardLeftSide
import "../../storage/css/ModalStyles.css"; // Importar el archivo CSS

// Configurar el elemento de la aplicación para react-modal
Modal.setAppElement('#root');

const DashboardCategories = () => {
  const [categories, setCategories] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalType, setModalType] = useState(""); // Para diferenciar entre agregar, editar y eliminar
  const [successMessage, setSuccessMessage] = useState("");
  const [confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleAdd = () => {
    setSelectedCategory(null);
    setModalType("add");
    setModalIsOpen(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setModalType("edit");
    setModalIsOpen(true);
  };

  const handleDelete = (category) => {
    setSelectedCategory(category);
    setConfirmDeleteModalIsOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/categories/${selectedCategory.id}`);
      fetchCategories(); // Actualizar la lista de categorías después de eliminar
      setSuccessMessage("Categoría eliminada con éxito");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      setConfirmDeleteModalIsOpen(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    fetchCategories(); // Actualizar la lista de categorías después de cerrar el modal
  };

  const closeConfirmDeleteModal = () => {
    setConfirmDeleteModalIsOpen(false);
  };

  const handleSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="content dashboardCategories">
      <DashboardLeftSide />
      <div className="rightSide">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "1rem 0" }}>
          <h2>Categorías - Panel De Control</h2>
          <button onClick={handleAdd} className="btn btn-primary">Agregar Categoría</button>
        </div>
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        <table style={{ width: "95%" }} className="table table-hover mx-auto my-5">
          <thead className="text-muted">
            <tr>
              <th>#</th>
              <th>Título</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={3}>No hay categorías disponibles</td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.title}</td>
                  <td>
                    <button onClick={() => handleEdit(category)} className="btn btn-warning btn-sm me-2">
                      Editar
                    </button>
                    <button onClick={() => handleDelete(category)} className="btn btn-danger btn-sm">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Categoría" className="Modal" overlayClassName="Overlay">
        {modalType === "add" && <AddCategory closeModal={closeModal} onSuccess={handleSuccess} />}
        {modalType === "edit" && selectedCategory && <UpdateCategory category={selectedCategory} closeModal={closeModal} onSuccess={handleSuccess} />}
      </Modal>

      <Modal isOpen={confirmDeleteModalIsOpen} onRequestClose={closeConfirmDeleteModal} contentLabel="Confirmar Eliminación" className="Modal" overlayClassName="Overlay">
        <div className="content dashboardCategories">
          <h2>¿Estás seguro de que deseas eliminar esta categoría?</h2>
          <p>{selectedCategory && selectedCategory.title}</p>
          <button onClick={confirmDelete} className="btn btn-danger">Eliminar</button>
          <button onClick={closeConfirmDeleteModal} className="btn btn-secondary">Cancelar</button>
        </div>
      </Modal>
    </div>
  );
};

export default DashboardCategories;