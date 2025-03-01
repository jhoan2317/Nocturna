import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const LeftSide = () => {
  const [brands, setBrands] = useState([]);

  const fetchBrands = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/brands");
      setBrands(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <div className="leftSide">
      <div>
        <h3>Eventos</h3>
        <nav>
          {brands.map((brand) => (
            <NavLink key={brand.id} to={`/brands/${brand.title}`}>
              {brand.title}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default LeftSide;