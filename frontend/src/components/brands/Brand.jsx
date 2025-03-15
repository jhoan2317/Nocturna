import React, { useEffect, useState } from "react";
import EventBg from "../events/EventBg";
import LeftSide from "../../partials/LeftSide";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../../partials/Spinner";
import ItemCard from "../events/itemCard";

const Brand = () => {
    const [data, setData] = useState(null);
    const { title: slug } = useParams();

    useEffect(()=>{
        // events
        axios.get(`http://localhost:8000/api/categories/${slug}/events`)
        .then(res => setData(res.data))
        .catch(err => console.error(err))
    }, [slug]);

    return(
        <div className="content">
            <LeftSide />
            <div className="rightSide">
                <EventBg bg={`/bg/${slug}.jpg`}/>
                {data==null
                    ?   <Spinner />
                    :   <div className="items">
                            {data.map(event =>
                                <ItemCard event={event} key={event.id} />
                            )}
                    </div>
                }
            </div>
        </div>
    )
}

export default Brand;