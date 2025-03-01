// src/maps/MapSelector.jsx
import React, { useState } from "react";

const MapSelector = ({ onSelect }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [error, setError] = useState(null);

  const handleClick = () => {
    try {
      // Simula la selección de una ubicación.
      const location = "Carrera 11 con Cl. 4 Nte., Popayán, Cauca";
      onSelect(location);
      setSelectedLocation(location);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", marginTop: "0.5rem" }}>
      {selectedLocation ? (
        <p>Ubicación seleccionada: {selectedLocation}</p>
      ) : (
        <p>Map Selector Placeholder</p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleClick}>Select Location</button>
    </div>
  );
};

export default MapSelector;
