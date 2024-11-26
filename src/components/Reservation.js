/*
Name: Joohyoung Jun
Email: joohyoung.jun@stonybrook.edu
*/
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Reservation = () => {
    const [reservations, setReservations] = useState([]);
    const [selectedFacility, setSelectedFacility] = useState("0");
    const [reservationDate, setReservationDate] = useState("");
    const [numPeople, setNumPeople] = useState("");
    const [affiliation, setAffiliation] = useState("");
    const [purpose, setPurpose] = useState("");
    const [facilityInfo, setFacilityInfo] = useState({
        value: "0",
        name: "Gym",
        image: "/assignImage/gym.jpg",
        mincapacity: 1,
        maxcapacity: 4,
        location: "C101",
        affiliation: "Available to all",
        availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        notAvailable: []
    });

    const facList = [
        {
            value: "0",
            name: "Gym",
            image: "/assignImage/gym.jpg",
            mincapacity: 1,
            maxcapacity: 4,
            location: "C101",
            affiliation: "Available to all",
            availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            notAvailable: []
        },
        {
            value: "1",
            name: "Swimming Pool",
            image: "/assignImage/pool.jpg",
            mincapacity: 1,
            maxcapacity: 4,
            location: "C102",
            affiliation: "Available to all",
            availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            notAvailable: []
        },
        {
            value: "2",
            name: "Conference Room",
            image: "/assignImage/conference.jpg",
            mincapacity: 1,
            maxcapacity: 4,
            location: "B101",
            affiliation: "Only for SUNY Korea",
            availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            notAvailable: []
        },
        {
            value: "3",
            name: "Auditorium",
            image: "/assignImage/auditorium.jpg",
            mincapacity: 10,
            maxcapacity: 30,
            location: "A101",
            affiliation: "Available to all",
            availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday"],
            notAvailable: ["Friday", "Saturday", "Sunday"]
        },
        {
            value: "4",
            name: "Seminar Room",
            image: "/assignImage/seminar.jpg",
            mincapacity: 1,
            maxcapacity: 4,
            location: "B201",
            affiliation: "Available to all",
            availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday"],
            notAvailable: ["Friday", "Saturday", "Sunday"]
        },
        {
            value: "5",
            name: "Library",
            image: "/assignImage/library.jpg",
            mincapacity: 1,
            maxcapacity: 4,
            location: "B301",
            affiliation: "Only for SUNY Korea", 
            availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            notAvailable: []
        }
    ];

    const checkAffiliation = (userAns) => { //function to check the affiliation
        const faclAffil = facilityInfo.affiliation; //selected facility's affiliation
        if (userAns === "No" && faclAffil === "Only for SUNY Korea"){   //check if whom does not belong to SUNYK trying to reserve
            window.alert("This facility is for SUNY Korea!");   //if so, alert the user and block reservation.
            return;
        }
        setAffiliation(userAns);
    };

    useEffect(() => {   //get reservations using axios.get()
        const fetchReservations = async () => {
            try {
                const authToken = localStorage.getItem("authToken");
                if (!authToken) {
                    console.error("No auth token found");
                    return;
                }
                const response = await axios.get("http://localhost:3001/reservations", {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                setReservations(response.data);
                console.log("Reservations fetched successfully:", response.data);
            } catch (err) {
                console.error("Error fetching reservations:", err);
            }
        };

        fetchReservations();
    }, []);

    const submission = (e) => {
        //prevent refresh 
        e.preventDefault();

        if (!reservationDate || !numPeople || !affiliation || !purpose) {  //check if all required fields are filled
            window.alert('Fill all required fields!');  // if not, alert the user and block reservation
            return;
        }

        if (numPeople < facilityInfo.mincapacity || numPeople > facilityInfo.maxcapacity) { //check if facility's capacity fits user's
            window.alert(`Number of people must be between ${facilityInfo.mincapacity} and ${facilityInfo.maxcapacity}.`);
            return;     //if not, alert the user with the minCapacity and maxCapacity info and block reservation. 
        }

        const dateObj= new Date(reservationDate); //create a Date object using the selected date from the user input

        

        const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"];
        const selectedDay = weekDays[dateObj.getDay()];

        // Check if the selectedDay is in the facility's availableDays list
        if(!facilityInfo.availableDays.includes(selectedDay)){
            window.alert(`This facility is not available on ${selectedDay}!`);
            return; //block the user from submitting if s/he tries to reserve notAvailable day
        }

        //cmpr sethrs would be here...?
        
        //check thru reservation list if there exist any reservations that the user made before
        //temporarily set username to "User" before assignment#4
        const userHasReserved = reservations.some(reservation => {
            const userNameTmp = "User"; // will change it in the future. 
            return (reservation.userName === userNameTmp) 
                && (reservation.reservationName === facilityInfo.name);
        });

        if(userHasReserved){
            window.alert(`You have made a reservation for ${facilityInfo.name} before!`);
            return;
        }


        //check reservation list if there exist the reservation already on the day user selected
        //used some() in order to find the facility is reserved on the day or not.
        //if so, return true
        const isReserved = reservations.some(reservation => {
            //compare dates
            const dateReserved = new Date(reservation.reservationDate).toLocaleDateString();
            const userDate = new Date(dateObj).toLocaleDateString();
            
            return (reservation.reservationName === facilityInfo.name)
                && (dateReserved === userDate);
        });
        
        //facility is reserved already
        //block user to make a reservation if the facility already reserved the day user selected
        if(isReserved){
            window.alert(`${facilityInfo.name} is reserved on ${dateObj.toLocaleDateString()} already!`);
            return;
        }
        

        const reservationData = {
            //generate uniqe id
            reservationId: Math.floor(Math.random() * 1000000000),
            reservationDate,
            userNum: numPeople,
            isSK: affiliation === "Yes" ? true : false,
            purpose,
            reservationName: facilityInfo.name,
            userName: "User",
            imageSrc: facilityInfo.image,
            reservationLocation: facilityInfo.location
            
        };

        axios.post("http://localhost:3001/reservations", reservationData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            })
            .then(response => {
                window.alert("Reservation Submitted!");
                setReservationDate("");
                setNumPeople("");
                setAffiliation("");
                setPurpose("");
                setSelectedFacility("0");
            })
            .catch(err => {
                console.error("Error submitting reservation: ", err);
            });
    };

    return (
        <div style={{ paddingLeft: "10%" }}>
            <h1><strong>Facility Reservation</strong></h1>
            <form onSubmit={submission}>
                <div style={{ width: "30%" }}>
                    <label htmlFor="selectfacility" className="form-label">Select Facility</label>
                    <select
                        name="selectfacility"
                        id="selectfacility"
                        className="form-select"
                        value={selectedFacility}
                        onChange={(sel) => {
                            const selectedValue = sel.target.value;
                            setSelectedFacility(selectedValue);
                            const selectedFacility = facList.find(facility => facility.value === selectedValue);
                            setFacilityInfo(selectedFacility);
                        }}
                    >
                        {facList.map((facility) => (
                            <option key={facility.value} value={facility.value}>
                                {facility.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <img id="facilityImage" src={facilityInfo.image} alt={facilityInfo.name} style={{ width: "50%", marginTop: "10px" }} />
                    <p><strong>{facilityInfo.name}</strong></p>
                    <p><i className="bi bi-people"> {facilityInfo.mincapacity} - {facilityInfo.maxcapacity}</i></p>
                    <p><i className="bi bi-map"> {facilityInfo.location}</i></p>
                    <p><i className="bi bi-info"> {facilityInfo.affiliation}</i></p>
                    <p><i className="bi bi-calendar"> Available: {facilityInfo.availableDays.join(", ")}</i></p>
                </div>
                <div style={{ width: "40%" }}>
                    <label htmlFor="date" className="form-label">Date to be Used:</label>
                    <input
                        type="date"
                        className="form-control"
                        id="date"
                        value={reservationDate}
                        onChange={(selectedDate) => setReservationDate(selectedDate.target.value)}
                    />
                </div>
                <div style={{ width: "40%" }}>
                    <label htmlFor="NumberofPeople" className="form-label">Number of People:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="NumberofPeople"
                        value={numPeople}
                        onChange={(userAns) => setNumPeople(userAns.target.value)}
                    />
                </div>
                <div>
                    <label className="form-label">Are you affiliated with SUNY Korea?</label><br />
                    <label htmlFor="checkYes" className="form-check-label">Yes</label>
                    <input
                        type="radio"
                        id="checkYes"
                        className="form-check-input"
                        value="Yes"
                        checked={affiliation === "Yes"}
                        onChange={(userAns) => checkAffiliation(userAns.target.value)}
                    />
                    <label htmlFor="checkNo" className="form-check-label ms-3">No</label>
                    <input
                        type="radio"
                        id="checkNo"
                        className="form-check-input"
                        value="No"
                        checked={affiliation === "No"}
                        onChange={(userAns) => checkAffiliation(userAns.target.value)}
                    />
                </div>
                <div style={{ width: "50%" }}>
                    <label htmlFor="purpose" className="form-label">Purpose of Use:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="purpose"
                        value={purpose}
                        onChange={(userAns) => setPurpose(userAns.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-outline-primary" style={{ marginTop: "10px" }}>Submit</button>
            </form>
        </div>
    );
};

export default Reservation;
