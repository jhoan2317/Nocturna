import React, { useState, useEffect } from "react";
import DashboardLeftSide from "./DashboardLeftSide";
import axios from "axios";
import Spinner from "../../partials/Spinner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import UpdateBrand from "../brands/UpdateBrand"; // Importar el componente UpdateBrand
import "../../storage/css/ModalStyles.css"; // Importar el archivo CSS

// Configurar el elemento de la aplicación para react-modal
Modal.setAppElement('#root');

const DashboardBrands = () => {
  const dispatch = useDispatch();
  const brands = useSelector((store) => store.brands);
  const user = useSelector((store) => store.user);
  const isAuthenticated = useSelector((store) => store.isAuthenticated);
  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const checkIsAuthenticated = () => {
    if (!isAuthenticated || user.role !== "admin") {
      navigate("/users/login");
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/categories");
      dispatch({ type: "setBrands", payload: { brands: res.data } });
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleEdit = (brand) => {
    setSelectedBrand(brand);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    fetchBrands(); // Actualizar la lista de marcas después de cerrar el modal
  };

  const handleSuccess = () => {
    setSuccessMessage("Marca actualizada con éxito");
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  useEffect(() => {
    checkIsAuthenticated();
    if (!brands) {
      fetchBrands();
    }
  }, [isAuthenticated, user]);

  return (
    <div className="content dashboardBrands">
      <DashboardLeftSide />
      <div className="rightSide">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "1rem 0" }}>
          <h2>Marcas - Panel De Control</h2>
        </div>
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        <table style={{ width: "95%" }} className="table table-hover mx-auto my-5">
          <thead className="text-muted">
            <tr>
              <th>#</th>
              <th>Titulo</th>
            </tr>
          </thead>
          <tbody>
            {brands == null ? (
              <tr>
                <td colSpan={3}><Spinner /></td>
              </tr>
            ) : (
              brands.map((brand) => (
                <tr key={brand.id}>
                  <td>{brand.id}</td>
                  <td>{brand.title}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Edit Brand" className="Modal" overlayClassName="Overlay">
        {selectedBrand && <UpdateBrand brand={selectedBrand} closeModal={closeModal} onSuccess={handleSuccess} />}
      </Modal>
    </div>
  );
};

export default DashboardBrands;