import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const ItemCard = ({event}) => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(store => store.isAuthenticated);
    const user = useSelector(store => store.user);
    const navigate = useNavigate();
    const savedEvents = useSelector(store => store.savedEvents)
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = async () => {
        if(isAuthenticated){
            if(!isSaved){
                try{
                    const res = await axios.post('http://localhost:8000/api/savedEvents/store', {user_id: user.id, event_id: event.id})
                    if(res.data.success){
                        setIsSaved(true);
                        dispatch( {type:'setSavedEvents', payload:{data:res.data.savedEvents}} )
                    }
                }catch(e){
                    console.log(e.message);
                }
            }else{
                try{
                    const res = await axios.delete(`http://localhost:8000/api/savedEvents/destroy/${event.id}/${user.id}`)
                    if(res.data.success){
                        setIsSaved(false);
                        dispatch( {type:'setSavedEvents', payload:{data:res.data.savedEvents}} )
                    }
                }catch(e){
                    console.log(e.message);
                }
            }
        }else{
            navigate('/users/login');
        }
    }

    useEffect(()=>{
        if(savedEvents.length > 0){
            const isS = savedEvents.some(sv => sv.event_id === event.id);
            setIsSaved(isS);
        }
    },  [])

    return(
        <div className="item">
            <img src={`/events_img/${event.imgPath}`} alt="" />
            <div>
                <i onClick={()=>handleSave()} className={isSaved ? 'fa-solid fa-heart text-danger' : 'fa-regular fa-heart'}></i>
                <p>{event.title}</p>
                <p><i className="fa-solid fa-star" style={{color:"gold"}}></i> <span>{event.rating}</span></p>
                <p>{event.price} DH</p>
                <NavLink to={`/events/show/${event.id}`}>Vista</NavLink>
            </div>
        </div>
    )
}

export default ItemCard;