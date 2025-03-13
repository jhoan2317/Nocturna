import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const ResetPassword = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Obtener el email y el parámetro direct de la URL
        const params = new URLSearchParams(location.search);
        const email = params.get("email");
        const direct = params.get("direct");
        
        if (email && direct === "true") {
            emailRef.current.value = email;
        } else {
            // Si no viene de un enlace directo, redirigir a forgot-password
            navigate("/forgot-password");
        }
    }, [location, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");
        setError("");

        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        try {
            const res = await axios.post("http://localhost:8000/api/password-reset/reset",
                {
                    email: emailRef.current.value,
                    password: passwordRef.current.value,
                    password_confirmation: confirmPasswordRef.current.value
                },
                {
                    withCredentials: true,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );

            setMessage(res.data.message);
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        } catch (err) {
            setError(err.response?.data?.error || "Error al restablecer la contraseña.");
        }
    };

    return (
        <div className="content flex-column justify-content-center" style={{ height: "90vh" }}>
            <form onSubmit={handleSubmit} style={{ width: "450px" }} className="p-4 mt-1 mx-auto rounded bg-light">
                <h2 className="mx-2 p-2">Restablecer contraseña</h2>
                <p className="fs-5 py-2 px-3">Ingresa tu nueva contraseña.</p>
                
                {message && <p className="text-success">{message}</p>}
                {error && <p className="text-danger">{error}</p>}

                <div className="my-1 py-2 px-3">
                    <label>Correo electrónico</label>
                    <input ref={emailRef} type="email" name="email" className="form-control" readOnly required />
                </div>

                <div className="my-1 py-2 px-3">
                    <label>Nueva contraseña</label>
                    <input ref={passwordRef} type="password" name="password" className="form-control" required />
                </div>

                <div className="my-1 py-2 px-3">
                    <label>Confirmar contraseña</label>
                    <input ref={confirmPasswordRef} type="password" name="password_confirmation" className="form-control" required />
                </div>

                <div className="btnParent d-flex justify-content-end my-1 py-2 px-3">
                    <button type="submit" className="btn col-12 btn-dark rounded-1">Restablecer contraseña</button>
                </div>
            </form>
        </div>
    );
};

export default ResetPassword;
