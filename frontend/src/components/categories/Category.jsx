import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Leftside from "../../partials/LeftSide";
import Spinner from "../../partials/Spinner";
import ItemCard from "../events/itemCard";

const Category = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();

    useEffect(()=>{
        setLoading(true);
        axios.get(`http://localhost:8000/api/categories/${slug}/events`)
        .then(res => {
            if (res.data && Array.isArray(res.data.data)) {
                setData(res.data.data);
            } else {
                setData([]);
            }
        })
        .catch(err => {
            console.error(err);
            setData([]);
        })
        .finally(() => {
            setLoading(false);
        });
    }, [slug]);

    return(
        <div className="content">
            <Leftside />
            <div className="rightSide">
                {loading
                    ? <Spinner />
                    : <div className="items">
                        {data.map(event =>
                            <ItemCard event={event} key={event.id} />
                        )}
                      </div>
                }
            </div>
        </div>
    )
}

export default Category;