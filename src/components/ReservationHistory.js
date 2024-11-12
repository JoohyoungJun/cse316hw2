import React, { useState, useEffect } from "react";
import axios from "axios";

const ReservationHistory = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {   //get reservations using axios.get()
        axios.get("http://localhost:3001/reservations")
            .then(response => {
                setReservations(response.data);
            })
            .catch(err => {
                console.error("Error fetching reservations: ", err);
            });
    }, []);

    const cancelReservation = (reservationId) => {
        axios.delete(`http://localhost:3001/reservations/${reservationId}`)
            .then(response => { //used filter in order to literally 'filter' what would not be deleted. (rest reservations)
                setReservations(reservations.filter(reservation => reservation.reservationId !== reservationId));
            })
            .catch(err => {
                console.error("Error canceling reservation: ", err);
            });
    }

    if (reservations.length === 0) {    //displayed when reservations list is empty
        return (
            <div style={{ paddingLeft: "10%" }}>
                <h1><strong>No Reservation Yet</strong></h1>
            </div>
        );
    }

    return (
        <div style={{ paddingLeft: "10%" }}>
            <h1><strong>Reservation History</strong></h1>
            <div className="row">
                {reservations.map((reservation) => (
                    <div key={reservation.reservationId} className="card" style={{ width: "80%", 
                        display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <img id="reservationImage"
                            src={reservation.imageSrc}
                            alt={reservation.reservationName}
                            className="card-img"
                            style={ { width: "40%", margin: "10px"} }
                        />
                        <div className="card-body-right">
                            <h3><strong>{reservation.reservationName}</strong></h3>
                            <p><i className="bi bi-pen"> {reservation.purpose}</i></p>
                            <p><i className="bi bi-calendar"> {new Date(reservation.reservationDate).toLocaleDateString()}</i></p>
                            <p><i className="bi bi-map"> {reservation.location}</i></p>
                            <p><i className="bi bi-people"> {reservation.userNum}</i></p>
                            <p><i className="bi bi-info"> {reservation.isSK ? "Only for SUNY Korea" : "Available to all"}</i></p>
                            <button className="btn btn-outline-danger" style={ {margin: "5px"} } onClick={() => 
                                cancelReservation(reservation.reservationId)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReservationHistory;
