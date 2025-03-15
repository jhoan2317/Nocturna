import api from '../../axios/axios';
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddComment = ({id, updateComments, setComments, type = 'place'}) => {
    const user = useSelector(store => store.user);
    const isAuthenticated = useSelector(store => store.isAuthenticated);
    const navigate = useNavigate();
    const text = useRef('');

    const handleText = (event) => {
        text.current = event.target.value
    }

    const handleKeyDown = (event) => {
        if(isAuthenticated){
            if (event.keyCode === 13 && text.current !== '') {
                const data = {
                    text: text.current,
                    user_id: user.id
                }
                
                // Añadir el ID según el tipo (lugar o evento)
                if (type === 'place') {
                    data.place_id = id;
                } else {
                    data.event_id = id;
                }

                api.post('/api/comments', data)
                .then(res => {
                    if(res.data.success){
                        event.target.value = '';
                        setComments(null);
                        updateComments();
                    }
                })
                .catch(err => {
                    console.error('Error adding comment:', err.response?.data || err);
                    alert('Error al añadir el comentario. Por favor, inténtalo de nuevo.');
                });
            }
        }else{
            navigate('/users/login');
        }
    }

    return(
        <div className='addCommentP'>
            <input 
                onChange={(event)=>handleText(event)} 
                onKeyDown={(event)=>handleKeyDown(event)} 
                type="text" 
                className="search form-control" 
                placeholder={`Añadir un comentario al ${type === 'place' ? 'lugar' : 'evento'}`} 
            />
        </div>
    )
}

export default AddComment;