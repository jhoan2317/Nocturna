import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const ShowEventCard = ({event}) => {
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

    const AddToCart = () => {
        dispatch( {type:'addEventToCart', payload:{event:event}} );
    }
    
    useEffect(()=>{
        if(savedEvents.length > 0){
            const isS = savedEvents.some(sv => sv.event_id === event.id);
            setIsSaved(isS);
        }
    },  [])

    return(
        <div className="eventCard">
            <div>
            <i onClick={()=>handleSave()} className={isSaved ? 'fa-solid fa-heart text-danger' : 'fa-regular fa-heart'}></i>
                <img src={`/events_img/${event.imgPath}`} alt="" />
            </div>
            <div>
                <h2>{event.title}</h2>
                <Link to={`/genders/${event.gender}`} className="nav-link fs-5 p-0">{event.gender}</Link>
                <p>Stock : {event.qtStock}</p>
                <p>Brand : <Link to={`/brands/${event.brand.title}`}>{event.brand.title}</Link></p>
                <p>category : <Link to={`/categories/${event.category.title}`}>{event.category.title}</Link></p>
                <p><i className="fa-solid fa-star" style={{color:"gold"}}></i> <span>{event.rating}</span></p>
                <p>Color : <span className="mx-2 px-3 py-1 rounded-circle" style={{backgroundColor:`${event.color}`}}></span></p>
                <p> {event.price} COP</p>
                {/* <i className="fa-solid fa-heart"></i> */}
            </div>
        </div>
    )
}

export default ShowEventCard;