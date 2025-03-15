import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const LeftSide = () => {
  const categories = useSelector(store => store.categories) || [];

  return (
    <div className="leftSide">
      <div>
        <h3>Eventos</h3>
        <nav>
          {categories.map((category) => (
            <NavLink 
              key={category.id} 
              to={`/categories/${category.slug}`}
              title={`Ver todos los eventos de ${category.title}`}
            >
              {category.title}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default LeftSide;