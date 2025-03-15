import React, { useEffect, useState } from "react";
import AddComment from "./AddComment";
import Spinner from "../../partials/Spinner";
import axios from "axios";

const Comments = ({id, type = 'place'}) => {
    const [comments, setComments] = useState(null);

    const updateComments = () => {
        const endpoint = type === 'place' ? 'places' : 'events';
        axios.get(`http://localhost:8000/api/${endpoint}/${id}/comments`)
        .then(res => {
            console.log('Comments response:', res.data);
            setComments(res.data.data || []);
        })
        .catch(err => {
            console.error('Error fetching comments:', err.response?.data || err);
            setComments([]);
        });
    }

    useEffect(()=>{
        updateComments();
    }, [id, type]);

    return(
        <div className="commentsP">
            <p>Comentarios:</p>
            <AddComment 
                id={id} 
                type={type}
                setComments={setComments} 
                updateComments={updateComments}
            />
            <div className="comments">
                {comments === null 
                    ? <Spinner />
                    : comments.length === 0
                        ? <p className="text-muted">No hay comentarios aún. ¡Sé el primero en comentar!</p>
                        : comments.map(c =>
                            <div key={c.id} className="comment">
                                <img 
                                    src={`/users_img/${c.user?.profile?.profilePic || 'no-img.jpg'}`} 
                                    alt={c.user?.name || 'Usuario'} 
                                />
                                <div>
                                    <p className="username">{c.user?.name || 'Usuario'}</p>
                                    <p className="text">{c.text}</p>
                                </div>
                                <span></span>
                            </div>
                        )
                }
            </div>
        </div>
    )
}

export default Comments;