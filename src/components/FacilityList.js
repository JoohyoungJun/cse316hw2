/*
Name: Joohyoung Jun
Email: joohyoung.jun@stonybrook.edu
*/
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "../App.css";

const FacilityList = () => {
    const [facilities, setFacilities] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/facilities").then(response => {
            console.log(response.data);
            setFacilities(response.data);
        })
        .catch(err => {
            console.error("error loading facility info", err);
        });
    }, []);

    return (
        <div style = { { paddingLeft: "10%"}}>
            <h1><strong>Facility List</strong></h1>
            <div className="row">
            {facilities.map(facility => (
                    <div className="card" style={ { width: "375px" } } key={facility.id}>
                        <img src={facility.imageSrc} alt={facility.facilityName} 
                            className="card-img-left" style={{marginTop: "10px"}} />
                        <div className="card-body">
                            <h3><strong>{facility.facilityName}</strong></h3>
                            <p>{facility.facilityDscr}</p>
                            <p><i className="bi bi-calendar"> {facility.availableDays}</i></p>
                            <p><i className="bi bi-people"></i> {facility.minCap} - {facility.maxCap}</p>
                            <p><i className="bi bi-map"> {facility.location}</i></p>
                            <p><i className="bi bi-info"> {facility.onlySKFlag ? 'Only for SUNY Korea' : 'Available to all'}</i></p>
                        </div>
                    </div>
                ))}
            </div>
        </div> 
    );
};

export default FacilityList;