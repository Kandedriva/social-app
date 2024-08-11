import React from "react";

function Stores(){


    return(
        <>
<form>
<div className="image-container">
                <h3>Store Name</h3>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWfsr-bgcNjxpgLUAY2L6K-_rr7wPbZ_y9aw&s" alt="#" />
                <address>
                    <a href="310west 116 street">310 West 116 Street, New York, NY</a>
                    <p>Zip code: 10026</p>
                    <p>Location: Manhattan</p>
                </address>
                <button className="storeOpenButton">Shop Now</button>
            </div>
</form>
        </>
    )
}

export default Stores