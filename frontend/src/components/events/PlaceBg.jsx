import React from "react";

const PlaceBg = ({bg}) => {
    return(
        <div className="eventBg" style={{backgroundImage: `url(${bg})`}}>
        </div>
    )
}

export default PlaceBg;