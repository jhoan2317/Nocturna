import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Slide from "../../partials/slide";
import ItemsCard from "../events/ItemsCard";
import EventBg from "../events/EventBg";
import Spinner from "../../partials/Spinner";

const Home = () => {
    const navigate = useNavigate();
    const user = useSelector(store => store.user);
    const brands = useSelector(store => store.brands);
    const data = useSelector(store => store.events);

    // Redirigir si el usuario es admin
    useEffect(() => {
        if (user && user.role === "admin") {
            navigate("/admins/dashboard");
        }
    }, [user, navigate]);

    return (
        <div className="home">
            <Slide />
            {(brands == null || data == null) ? (
                <Spinner />
            ) : (
                brands.map(brand => (
                    <Fragment key={brand.id}>
                        <EventBg bg={`bg/${brand.title}.jpg`} />
                        <ItemsCard events={data} brand={brand.title} state="home" />
                    </Fragment>
                ))
            )}
        </div>
    );
};

export default Home;
