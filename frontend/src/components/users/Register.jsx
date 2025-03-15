import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const data = useRef({
        name: '', 
        last_name: '', 
        birthday: '',
        email: '', 
        password: '',
        password_confirmation: '',
        gender: ''
    });

    const handleInput = (input) => {
        data.current[input.name] = input.value;
        // Limpiar error del campo cuando el usuario empieza a escribir
        if (errors[input.name]) {
            setErrors(prev => {
                const newErrors = {...prev};
                delete newErrors[input.name];
                return newErrors;
            });
        }
    }
    
    const handleRegister = async (event) => {
        event.preventDefault();
        const {name, last_name, birthday, email, password, password_confirmation, gender} = data.current;
        
        try {
            const res = await axios.post('http://localhost:8000/api/users/register', data.current);
            alert('¡Cuenta creada exitosamente!');
            navigate('/users/login');
        } catch(e) {
            if (e.response?.status === 422) {
                setErrors(e.response.data.errors);
            } else {
                console.log(e.message);
                setErrors({general: 'Ocurrió un error al crear la cuenta'});
            }
        }
    }

    return(
        <div style={{height: '100vh'}} className="content flex-column justify-content-center">
            <form onSubmit={handleRegister} method="post" style={{width: '450px'}} className="p-4 mt-1 mx-auto rounded bg-light">
                <h2 className="mx-2 p-1">Registro Usuario</h2>
                {errors.general && <p className="Error fw-semibold text-danger">{errors.general}</p>}
                <p className="fs-5 py-1 px-3">Bienvenidos a Popayán Nocturna, ¡Creemos una cuenta!</p>
                
                <div className="my-3 px-3">
                    <label>Nombre</label>
                    <input onChange={(event)=>handleInput(event.target)} type="text" name="name" className={`form-control px-3 col-12 ${errors.name ? 'is-invalid' : ''}`} />
                    {errors.name && <div className="invalid-feedback">{errors.name[0]}</div>}
                </div>

                <div className="my-3 px-3">
                    <label>Apellido</label>
                    <input onChange={(event)=>handleInput(event.target)} type="text" name="last_name" className={`form-control px-3 col-12 ${errors.last_name ? 'is-invalid' : ''}`} />
                    {errors.last_name && <div className="invalid-feedback">{errors.last_name[0]}</div>}
                </div>

                <div className="my-3 px-3">
                    <label>Cumpleaños</label>
                    <input onChange={(event)=>handleInput(event.target)} type="date" name="birthday" className={`form-control px-3 col-12 ${errors.birthday ? 'is-invalid' : ''}`} />
                    {errors.birthday && <div className="invalid-feedback">{errors.birthday[0]}</div>}
                </div>

                <div className="my-3 px-3">
                    <label>Género</label>
                    <select onChange={(event)=>handleInput(event.target)} name="gender" className={`form-control px-3 col-12 ${errors.gender ? 'is-invalid' : ''}`}>
                        <option value="">Seleccione un género</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                    </select>
                    {errors.gender && <div className="invalid-feedback">{errors.gender[0]}</div>}
                </div>

                <div className="my-3 px-3">
                    <label>Correo electrónico</label>
                    <input onChange={(event)=>handleInput(event.target)} type="email" name="email" className={`form-control px-3 col-12 ${errors.email ? 'is-invalid' : ''}`} />
                    {errors.email && <div className="invalid-feedback">{errors.email[0]}</div>}
                </div>
                
                <div style={{position: 'relative'}} className="my-3 px-3">
                    <label>Contraseña</label>
                    <input onChange={(event)=>handleInput(event.target)} type="password" name="password" className={`form-control ps-3 pe-5 col-12 ${errors.password ? 'is-invalid' : ''}`} />
                    {errors.password && <div className="invalid-feedback">{errors.password[0]}</div>}
                    <small className="text-muted">La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial (@$!%*#?&)</small>
                </div>

                <div style={{position: 'relative'}} className="my-3 px-3">
                    <label>Confirmar Contraseña</label>
                    <input onChange={(event)=>handleInput(event.target)} type="password" name="password_confirmation" className={`form-control ps-3 pe-5 col-12 ${errors.password_confirmation ? 'is-invalid' : ''}`} />
                    {errors.password_confirmation && <div className="invalid-feedback">{errors.password_confirmation[0]}</div>}
                </div>
    
                <div className="btnParent d-flex justify-content-end my-1 py-2 px-3">
                    <button style={{padding: '14px 0'}} type="submit" name="register" className="btn col-12 btn-dark rounded-1">Registrarse</button>
                </div>
            </form>
        </div>
    )
}

export default Register;