import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Leftside from "../../partials/LeftSide";
import Spinner from "../../partials/Spinner";
import ItemCard from "./itemCard";

const Filter = () => {
    const [data, setData] = useState(null);
    const {text} = useParams();

    useEffect(()=>{
        // events
        axios.get(`http://localhost:8000/api/events/search/${text}`)
        .then(res => setData(res.data) )
        .catch(err => console.error(err))
    }, [text]);

    const notFound = <div>
        <p className="text-capitalize mt-5 p-4 text-center"> no events founded </p>
    </div>

    return(
        <div className="content">
            <Leftside />
            <div className="rightSide">
                {data==null
                    ?   <Spinner />
                    :   (data.length ===0 ) 
                        ?   notFound   
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

export default Filter;