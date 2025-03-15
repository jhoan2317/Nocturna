import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../../axios/axios';

const WorkWithUs = () => {
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const user = useSelector(store => store.user);
    const isAuthenticated = useSelector(store => store.isAuthenticated);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await api.post('/api/client-requests', {
                user_id: user.id,
                message: message
            });

            if (response.data.success) {
                setSuccess('Tu solicitud ha sido enviada con éxito. Te notificaremos cuando sea revisada.');
                setMessage('');
                setTimeout(() => setShowModal(false), 3000);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error al enviar la solicitud. Por favor, inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated || user.role === 'admin' || user.role === 'client') {
        return null;
    }

    return (
        <>
            <button 
                className="btn btn-outline-primary ms-2" 
                onClick={() => setShowModal(true)}
            >
                Trabaja con nosotros
            </button>

            {showModal && (
                <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Trabaja con nosotros</h5>
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    {error && (
                                        <div className="alert alert-danger">{error}</div>
                                    )}
                                    {success && (
                                        <div className="alert alert-success">{success}</div>
                                    )}
                                    <div className="form-group">
                                        <label>¿Por qué quieres trabajar con nosotros?</label>
                                        <textarea 
                                            className="form-control mt-2"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            rows="4"
                                            required
                                            placeholder="Cuéntanos por qué te gustaría ser parte de nuestro equipo..."
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button 
                                        type="button" 
                                        className="btn btn-secondary" 
                                        onClick={() => setShowModal(false)}
                                        disabled={loading}
                                    >
                                        Cancelar
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary"
                                        disabled={loading || !message.trim()}
                                    >
                                        {loading ? 'Enviando...' : 'Enviar solicitud'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default WorkWithUs; 