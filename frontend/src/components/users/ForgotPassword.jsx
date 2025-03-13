import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const emailRef = useRef();
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");
        setError("");

        try {
            const res = await axios.post("http://localhost:8000/api/password-reset/request", 
                {
                    email: emailRef.current.value,
                },
                {
                    withCredentials: true,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );

            setMessage("Te hemos enviado un correo con un enlace para restablecer tu contraseña. Por favor, revisa tu bandeja de entrada.");
        } catch (err) {
            setError(err.response?.data?.error || "Error al enviar el correo. Verifica tu email.");
        }
    };

    return (
        <div className="content flex-column justify-content-center" style={{ height: "90vh" }}>
            <form onSubmit={handleSubmit} style={{ width: "450px" }} className="p-4 mt-1 mx-auto rounded bg-light">
                <h2 className="mx-2 p-2">Recuperar contraseña</h2>
                <p className="fs-5 py-2 px-3">Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña inmediatamente.</p>
                
                {message && <p className="text-success">{message}</p>}
                {error && <p className="text-danger">{error}</p>}

                <div className="my-1 py-2 px-3">
                    <label>Correo electrónico</label>
                    <input ref={emailRef} type="email" name="email" className="form-control" required />
                </div>

                <div className="btnParent d-flex justify-content-end my-1 py-2 px-3">
                    <button type="submit" className="btn col-12 btn-dark rounded-1">Enviar enlace</button>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;
