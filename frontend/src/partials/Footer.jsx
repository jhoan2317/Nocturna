import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import logo from "../storage/logo/whiteLogo-removebg.png";
import "../storage/css/ModalQ.css"; // Importar el archivo CSS para el modal

// Configurar el elemento de la aplicación para react-modal
Modal.setAppElement('#root');

const Footer = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [privacyModalIsOpen, setPrivacyModalIsOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const openPrivacyModal = () => {
        setPrivacyModalIsOpen(true);
    };

    const closePrivacyModal = () => {
        setPrivacyModalIsOpen(false);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubscribe = async () => {
        try {
            const res = await axios.post('http://localhost:8000/api/subscribe', { email });
            if (res.data.success) {
                setSuccessMessage("Suscripción exitosa");
                setEmail("");
                setTimeout(() => {
                    setSuccessMessage("");
                }, 3000);
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <footer>
            <div className="topSide">
                <div>
                    <h3>Popayán Nocturna</h3>
                    <p className="m-0">Manténgase actualizado con los últimos eventos, anuncios de la ciudad.</p>
                </div>
                <div>
                    <div>
                        <input 
                            placeholder="Introduce tu correo electrónico" 
                            type="text" 
                            className="form-control" 
                            value={email}
                            onChange={handleEmailChange}
                            title="Ingresa tu correo para recibir actualizaciones"
                        />
                        <button className="btn" onClick={handleSubscribe} title="Suscríbete a nuestro boletín">Suscribete</button>
                    </div>
                    {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
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
                        <a href="#" onClick={openModal} title="Conoce más sobre nosotros">¿Quienes somos?</a>
                        <a href="#" onClick={openPrivacyModal} title="Lee nuestras políticas de privacidad">Políticas y Privacidad</a>
                    </nav>
                    <nav>
                        <p>Contactanos</p>
                        <a href="mailto:popayan.noct@gmail.com" title="Envíanos un correo electrónico">
                            <i className="fa-solid fa-envelope"> </i>
                            <span> popayan.noc@gmail.com</span>
                        </a>
                    </nav>
                </div>
            </div>
            <div className="bottomSide">
                <span>© 2025 popayan.nocturna.com Todos los derechos reservados</span>
            </div>

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="¿Quienes somos?" className="Modal" overlayClassName="Overlay">
                <h2>¿Quienes somos?</h2>
                <p>Popayán Nocturna es una plataforma dedicada a mantenerte informado sobre los últimos eventos y anuncios en la ciudad de Popayán. Nuestro objetivo es conectar a la comunidad con las actividades culturales, sociales y recreativas que se llevan a cabo en la ciudad.</p>
                <button onClick={closeModal} className="btn btn-secondary">Cerrar</button>
            </Modal>

            <Modal isOpen={privacyModalIsOpen} onRequestClose={closePrivacyModal} contentLabel="Políticas y Privacidad" className="Modal" overlayClassName="Overlay">
                <h2>Políticas y Privacidad</h2>
                <p>En Popayán Nocturna, nos comprometemos a proteger su privacidad. Toda la información personal que recopilamos se utiliza únicamente para mejorar su experiencia en nuestra plataforma. No compartimos su información con terceros sin su consentimiento.</p>
                <button onClick={closePrivacyModal} className="btn btn-secondary">Cerrar</button>
            </Modal>
        </footer>
    );
};

export default Footer;