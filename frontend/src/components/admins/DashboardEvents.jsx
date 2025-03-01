// src/components/admins/DashboardEvents.jsx
import React, { useEffect } from "react";
import DashboardLeftSide from "./DashboardLeftSide";
import axios from "axios";
import Spinner from "../../partials/Spinner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const DashboardEvents = () => {
  const dispatch = useDispatch();
  const events = useSelector((store) => store.events);
  const user = useSelector((store) => store.user);
  const isAuthenticated = useSelector((store) => store.isAuthenticated);
  const navigate = useNavigate();

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

  const handleDelete = async (event_id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (confirmDelete) {
      try {
        const res = await axios.delete(`http://localhost:8000/api/events/destroy/${event_id}`);
        const { success, events } = res.data;
        if (success) {
          dispatch({ type: "setEvents", payload: { events } });
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const handleEdit = (event_id) => {
    navigate(`/admins/dashboard/events/edit/${event_id}`);
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
          <button onClick={() => navigate("/admins/dashboard/events/add")} className="btn btn-primary">
            Create Event
          </button>
        </div>
        <table style={{ width: "95%" }} className="table table-hover mx-auto my-5">
          <thead className="text-muted">
            <tr>
              <th>#</th>
              <th>Perfil</th>
              <th>Titulo</th>
              <th>Genero</th>
              <th>Precio</th>
              <th>Color</th>
              <th>Marca</th>
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
                  <td>{event.gender}</td>
                  <td>{event.price}</td>
                  <td>{event.color}</td>
                  <td>{event.brand.title}</td>
                  <td>
                    <button onClick={() => handleEdit(event.id)} className="btn btn-warning btn-sm me-2">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(event.id)} className="btn btn-danger btn-sm">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardEvents;
