/*
Name: Joohyoung Jun
Email: joohyoung.jun@stonybrook.edu
*/
import React, { useState, useEffect } from "react";
import axios from "axios";

const ReservationHistory = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                //get authToken from localStorage
                const authToken = localStorage.getItem("authToken");
                if (!authToken) {//if not found, report error and return
                    console.error("No auth token found. Please log in.");
                    return;
                }
                
                //get reservations from server
                //authheader with the Bearer token for authentication
                const response = await axios.get("http://localhost:3001/reservations", {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });

                //set fetched reservation to reservation
                setReservations(response.data);
            } catch (err) {
                //failure to fetch
                console.error("Error fetching reservations:", err);
            }
        };

        fetchReservations();
    }, []);

    const cancelReservation = async (reservationId) => {
        try {
            //get authToken from localStorate
            const authToken = localStorage.getItem("authToken");
            if (!authToken) {   //if not found, report error and return
                console.error("No auth token found. Please log in.");
                return;
            }

            //delete request to a server 
            //used reservationId
            await axios.delete(`http://localhost:3001/reservations/${reservationId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            //remove canceld reservation from the list using filter
            setReservations((prevReservations) =>
                prevReservations.filter((reservation) => reservation.reservationId !== reservationId)
            );
        } catch (err) { //failure to cancel
            console.error("Error canceling reservation:", err.response?.data || err.message);
        }
    };

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
                            <p><i className="bi bi-map"> {reservation.reservationLocation}</i></p>
                            <p><i className="bi bi-people"> {reservation.userNum}</i></p>
                            <p><i className="bi bi-info"> Is SUNY Korea?: {reservation.isSK ? "Yes" : "NO"}</i></p>
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
