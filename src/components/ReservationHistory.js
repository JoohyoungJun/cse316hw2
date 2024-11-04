/*
Name: Joohyoung Jun
Email: joohyoung.jun@stonybrook.edu
*/
import React from "react";
import { useState } from "react";


const ReservationHistory = () => {  //get reservation info using useState and JSON (local storage)

    const [reservations, setReservations] = useState(
        JSON.parse(localStorage.getItem("reservations")) || []  
    );
    console.log(localStorage.getItem("reservations"));
    //localStorage.clear("reservations");

    if(reservations.length === 0){  //an entry page if there doesnt exist any reservations
        return (
            <div style={ {paddingLeft: "10%"} }>
                <h1><strong>No Reservation Yet</strong></h1>
            </div>
        );
    }

    const cancelReservation = (reservationId) => {
        let afterDeletion = []; //build an array for reservation after deletion
        
        for (let i = 0; i < reservations.length; i++) { //check thru old reservations
            if (reservations[i].id !== reservationId) { //push old items which does not match
                afterDeletion.push(reservations[i]);    //reservation id which will be deleted
            }
        }
        //update localStorage with the new array of reservations (after deletion)
        localStorage.setItem("reservations", JSON.stringify(afterDeletion));
        setReservations(afterDeletion);

    }

    return (
        <div style={ {paddingLeft: "10%"} }>
            <h1><strong>Reservation History</strong></h1>
            <div className="row">
                {reservations.map((reservation) => (
                        <div key={reservation.id} className="card mb-3" style={ {width: "90%"} }>
                            <img src={reservation.image} alt={reservation.facility} className="card-img-left"   //I have no idea why this doesnt work.
                                style={ {width: "40%", marginTop: "10px"} }></img>
                            <div className="card-body">
                                <h3><strong>{reservation.facility}</strong></h3>
                                <p><i className="bi bi-pen"> {reservation.purpose}</i></p>
                                <p><i className="bi bi-calendar"> {reservation.date}</i></p>
                                <p><i className="bi bi-map"> {reservation.location}</i></p>
                                <p><i className="bi bi-people"> {reservation.numPeople}</i></p>
                                <p><i className="bi bi-info"> {reservation.affiliation}</i></p>
                                <button className="btn btn-outline-danger"
                                    onClick={() => cancelReservation(reservation.id)}>Cancel</button>
                            
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ReservationHistory;