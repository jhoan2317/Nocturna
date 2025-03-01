import React from "react";

const EventBg = ({bg}) => {
    return(
        <div className="eventBg" style={{backgroundImage: `url(${bg})`}}>
        </div>
    )
}

export default EventBg;