import React, { useEffect, useState } from "react";
import axios from "axios";

function Stores(){

    const [stores, setStores] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5001/stores")
        .then(response =>{
            console.log(response.data)
            setStores(response.data)
        })
        
    }, []);


function enterTheStore(){
    console.log("I'm ready to open the store..!")
}

    return(
        <>
        {stores.map((store)=>(
            <div key={store.id} className="image-container">
        <h3>{store.store_name}</h3>
        <img src={store.store_image} alt="#" className="storesImage"/>
        <address>
            <a href=""  >{store.street_address}</a>
        </address>
        <p> Zip code: {store.postal_code} </p>
        <p>Location:{store.store_location} </p>
        <button className="storeOpenButton" onClick={enterTheStore}>Shop Now</button>


        </div>))}
        </>
    )
}

export default Stores