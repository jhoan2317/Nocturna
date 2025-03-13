import React from "react";
import { NavLink } from "react-router-dom";

const Slide = () => {
    return(
        <div className="slideP">
            <div className="slides">
                <div style={{backgroundImage: `url('bg/1.jpg')`}} className="slide">
                    <h1>Las Iglesias históricas de Popayán</h1>
                    <NavLink className="btn" to="/brands/Iglesias" title="Explora las iglesias históricas de Popayán">Descubrir</NavLink>
                </div>

                <div style={{backgroundImage: `url('bg/2.2.jpg')`}} className="slide">
                    <h1 className="text-light">Sus mejores Hoteles</h1>
                    <NavLink className="btn" to="/brands/Hoteles" title="Conoce los mejores hoteles de la ciudad">Descubrir</NavLink>
                </div>
                
                <div style={{backgroundImage: `url('bg/2.jpg')`}} className="slide">
                    <h1 className="text-light">Sus mejores Restaurantes</h1>
                    <NavLink className="btn" to="/brands/Restaurantes" title="Descubre la gastronomía de Popayán">Descubrir</NavLink>
                </div>

                <div style={{backgroundImage: `url('bg/3.jpg')`}} className="slide">
                    <h1 className="text-light">Museos<span style={{color:"#FD7B00"}}></span></h1>
                    <NavLink className="btn" to="/brands/Museos" title="Visita los museos de la ciudad">Descubrir</NavLink>
                </div>

                <div style={{backgroundImage: `url('bg/4.jpg')`}} className="slide">
                    <h1 className="text-light">Los Parques imperdibles de Popayán</h1>
                    <NavLink className="btn" to="/brands/Parques" title="Conoce los parques más hermosos">Descubrir</NavLink>
                </div>

                <div style={{backgroundImage: `url('bg/5.jpg')`}} className="slide">
                    <h1 className="text-light">Eventos culturales en Popayán</h1>
                    <NavLink className="btn" to="/brands/Eventos" title="Entérate de los eventos culturales">Descubrir</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Slide;