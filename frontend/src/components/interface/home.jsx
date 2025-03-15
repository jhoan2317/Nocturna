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
    const categories = useSelector(store => store.categories) || [];
    const events = useSelector(store => store.events) || [];

    useEffect(() => {
        console.log('Categories:', categories);
        console.log('Events:', events);
        events.forEach(event => {
            console.log(`Event ${event.id}:`, event);
        });
    }, [categories, events]);

    // Redirigir si el usuario es admin
    useEffect(() => {
        if (user && user.role === "admin") {
            navigate("/admins/dashboard");
        }
    }, [user, navigate]);

    return (
        <div className="home">
            <Slide />
            {(!Array.isArray(categories) || categories.length === 0 || !events) ? (
                <Spinner />
            ) : (
                categories.map(category => {
                    console.log(`Rendering category:`, category);
                    return (
                        <Fragment key={category.id}>
                            <EventBg bg={`bg/${category.title}.jpg`} />
                            <ItemsCard 
                                events={events} 
                                brand={category.title} 
                                state="home" 
                                slug={category.slug} 
                            />
                        </Fragment>
                    );
                })
            )}
        </div>
    );
};

export default Home;
