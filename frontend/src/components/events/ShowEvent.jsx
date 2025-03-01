import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../../partials/Spinner";
import ShowEventCard from "./ShowEventCard";
import Comments from "../Comments/Comments";

const ShowEvent = () => {
    const [event, setEvents] = useState(null);
    const {id} = useParams();

    useEffect(()=>{
        // event
        axios.get(`http://localhost:8000/api/events/show/${id}`)
        .then(res => setEvents(res.data))
        .catch(err => console.error(err))
    }, [id])

    return(
        <div className="content flex-column align-items-center">
            {event==null
                ?   <Spinner />
                :   <>
                    <ShowEventCard event={event}/>
                    <Comments id={event.id}/>
                </>
            }
        </div>
    )
}

export default ShowEvent;