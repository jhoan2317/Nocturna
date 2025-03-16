import React, { useState } from 'react';
import api from '../../axios/axios';

const WorkWithUsModal = ({ onClose, user }) => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await api.post('/api/work-requests', {
                user_id: user.id,
                message: message,
                status: 'pending'
            });

            if (response.data.success) {
                setSuccess('¡Tu solicitud ha sido enviada con éxito! Te contactaremos pronto.');
                setMessage('');
                setTimeout(() => {
                    onClose();
                }, 3000);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Hubo un error al enviar tu solicitud. Por favor intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div 
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                onClick={onClose}
            />
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                    <h3 className="text-lg font-semibold leading-6 text-gray-900">
                                        Trabaja con nosotros
                                    </h3>
                                    <div className="mt-4">
                                        {error && (
                                            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                                                {error}
                                            </div>
                                        )}
                                        {success && (
                                            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                                                {success}
                                            </div>
                                        )}
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div>
                                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                                    ¿Por qué te gustaría trabajar con nosotros?
                                                </label>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    rows="4"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                    placeholder="Cuéntanos sobre ti, tu experiencia y por qué te gustaría unirte a nuestro equipo..."
                                                    value={message}
                                                    onChange={(e) => setMessage(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-2">
                                                <button
                                                    type="submit"
                                                    disabled={loading || !message.trim()}
                                                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {loading ? 'Enviando...' : 'Enviar solicitud'}
                                                </button>
                                                <button
                                                    type="button"
                                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                    onClick={onClose}
                                                >
                                                    Cancelar
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WorkWithUsModal; 