import React from "react";
import logo from "../storage/logo/whiteLogo-removebg.png";

const Footer = () => {
    return(
        <footer>
            <div className="topSide">
                <div>
                    <h3>Popayán Nocturna</h3>
                    <p className="m-0">Manténgase actualizado con los últimos eventos, anuncios de la ciudad.</p>
                </div>
                <div>
                    <div>
                        <input placeholder="Introduce tu correo electrónico" type="text" className="form-control" />
                        <button className="btn">Suscribete</button>
                    </div>
                </div>
            </div>
            <div className="middleSide">
                <div className="logoP">
                    <a href="/">
                        <img src={logo} alt="" />
                    </a>
                </div>
                <div>
                    <nav>
                        <p>Centro de ayuda</p>
                        <a href="/">¿Quienes somos?</a>
                    </nav>
                    <nav>
                        <p>Contactanos</p>
                        <a href="mailto:popayan.noct@gmail.com">
                            <i className="fa-solid fa-envelope"> </i>
                            <span> popayan.noc@gmail.com</span>
                        </a>
                        <div className="iconsP">
                            <a href="/">
                                <i className="fa-brands fa-facebook"></i>
                            </a>
                            <a href="/">
                                <i className="fa-brands fa-twitter"></i>
                            </a>
                            <a href="/">
                                <i className="fa-brands fa-instagram"></i>
                            </a>
                        </div>
                    </nav>
                </div>
            </div>
            <div className="bottomSide">
                <span>© 2025 popayan.nocturna.com Todos los derechos reservados</span>
            </div>
        </footer>
    )
}

export default Footer;