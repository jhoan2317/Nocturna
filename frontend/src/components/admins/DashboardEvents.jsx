import React, { useState, useEffect } from "react";
import DashboardLeftSide from "./DashboardLeftSide";
import axios from "axios";
import Spinner from "../../partials/Spinner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import AddEvent from "../events/AddEvent";
import UpdateEvent from "../events/UpdateEvent";
import "../../storage/css/ModalStyles.css"; // Importar el archivo CSS

// Configurar el elemento de la aplicación para react-modal
Modal.setAppElement('#root');

const DashboardEvents = () => {
  const dispatch = useDispatch();
  const events = useSelector((store) => store.events);
  const user = useSelector((store) => store.user);
  const isAuthenticated = useSelector((store) => store.isAuthenticated);
  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [modalType, setModalType] = useState(""); // 'add' or 'edit'

  const checkIsAuthenticated = () => {
    if (!isAuthenticated || user.role !== "admin") {
      navigate("/users/login");
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/events");
      dispatch({ type: "setEvents", payload: { events: res.data } });
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/events/destroy/${id}`);
      const { success, events } = res.data;
      if (success) {
        dispatch({ type: "setEvents", payload: { events } });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setModalType("edit");
    setModalIsOpen(true);
  };

  const handleAdd = () => {
    setModalType("add");
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    fetchEvents(); // Actualizar la lista de eventos después de cerrar el modal
  };

  const handleSuccess = () => {
    setSuccessMessage("Evento actualizado con éxito");
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  useEffect(() => {
    checkIsAuthenticated();
    if (!events) {
      fetchEvents();
    }
  }, [isAuthenticated, user]);

  return (
    <div className="content dashboardEvents">
      <DashboardLeftSide />
      <div className="rightSide">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "1rem 0" }}>
          <h2>Eventos - Panel De Control</h2>
          <button onClick={handleAdd} className="btn btn-primary">
            Crear Evento
          </button>
        </div>
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        <table style={{ width: "95%" }} className="table table-hover mx-auto my-5">
          <thead className="text-muted">
            <tr>
              <th>#</th>
              <th>Perfil</th>
              <th>Titulo</th>
              <th>Descripción</th>
              <th>Ubicación</th>
              <th>Precio</th>
              <th>Puntaje</th>
              <th>Marca</th>
              <th>Categoria</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {events == null ? (
              <tr>
                <td colSpan={8}><Spinner /></td>
              </tr>
            ) : (
              events.map((event) => (
                <tr key={event.id}>
                  <td>{event.id}</td>
                  <td>
                    {event.imgPath == null ? (
                      <i className="fa-solid fa-circle-user"></i>
                    ) : (
                      <img src={`/events_img/${event.imgPath}`} alt="event" style={{ width: "50px", height: "50px" }} />
                    )}
                  </td>
                  <td>{event.title}</td>
                  <td>{event.description}</td>
                  <td>{event.location}</td>
                  <td>{event.price}</td>
                  <td>{event.rating}</td>
                  <td>{event.brand.title}</td>
                  <td>{event.category.title}</td>
                  <td>
                    <button onClick={() => handleEdit(event)} className="btn btn-warning btn-sm me-2">
                      Editar
                    </button>
                    <button onClick={() => handleDelete(event.id)} className="btn btn-danger btn-sm">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Event Modal" className="Modal" overlayClassName="Overlay">
        {modalType === "add" && <AddEvent closeModal={closeModal} onSuccess={handleSuccess} />}
        {modalType === "edit" && selectedEvent && <UpdateEvent event={selectedEvent} closeModal={closeModal} onSuccess={handleSuccess} />}
      </Modal>
    </div>
  );
};

export default DashboardEvents;