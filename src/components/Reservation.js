/*
Name: Joohyoung Jun
Email: joohyoung.jun@stonybrook.edu
*/
import React from "react";
import { useState } from "react";

const Reservation = () => {
    const [selectedFacility, setSelectedFacility] = useState("0");
    const [date, setDate] = useState("");
    const [numPeople, setNumPeople] = useState("");
    const [affiliation, setAffiliation] = useState("");
    const [purpose, setPurpose] = useState("");
    const [facilityInfo, setFacilityInfo] = useState({
        value: "0",
        name: "Gym",
        image: "/assignImage/gym.jpg",
        mincapacity: 1,
        maxcapacity: 4,
        location: "C1033",
        affiliation: "Available to all"
    });

    const facList = [
        {
            value: "0",
            name: "Gym",
            image: "/assignImage/gym.jpg",
            mincapacity: 1,
            maxcapacity: 4,
            location: "C101",
            affiliation: "Available to all"
        },
        {
            value: "1",
            name: "Swimming Pool",
            image: "/assignImage/pool.jpg",
            mincapacity: 1,
            maxcapacity: 4,
            location: "C102",
            affiliation: "Available to all"
        },
        {
            value: "2",
            name: "Conference Room",
            image: "/assignImage/conference.jpg",
            mincapacity: 1,
            maxcapacity: 4,
            location: "B101",
            affiliation: "Only for SUNY Korea"
        },
        {
            value: "3",
            name: "Auditorium",
            image: "/assignImage/auditorium.jpg",
            mincapacity: 10,
            maxcapacity: 30,
            location: "A101",
            affiliation: "Available to all"
        },
        {
            value: "4",
            name: "Seminar Room",
            image: "/assignImage/seminar.jpg",
            mincapacity: 1,
            maxcapacity: 4,
            location: "B201",
            affiliation: "Available to all"
        },
        {
            value: "5",
            name: "Library",
            image: "/assignImage/library.jpg",
            mincapacity: 1,
            maxcapacity: 4,
            location: "B301",
            affiliation: "Only for SUNY Korea"
        }
    ];

    const checkAffiliation = (userAns) => { //function to check the affiliation
        const faclAffil = facilityInfo.affiliation; //selected facility's affiliation
        if (userAns === "No" && faclAffil === "Only for SUNY Korea"){   //check if whom does not belong to SUNYK trying to reserve
            window.alert(`This facility is for SUNY Korea!`);   //if so, alert the user and block reservation.
            return;
        }
        setAffiliation(userAns);
    };

    const submission = () => {
        
        if (!date || !numPeople || !affiliation || !purpose) {  //check if all required fields are filled
            window.alert('Fill all required fields!');  // if not, alert the user and block reservation
            return;
        }

        if (numPeople < facilityInfo.mincapacity || numPeople > facilityInfo.maxcapacity) { //check if facility's capacity fits user's
            window.alert(`Number of people must be between ${facilityInfo.mincapacity} and ${facilityInfo.maxcapacity}.`);
            return;     //if not, alert the user with the minCapacity and maxCapacity info and block reservation. 
        }

        const ReservationId = Math.random();    //set reservationId as random number in order to
                                                //use it a id in ReservationHistory.js

        const reservation = {
            id: ReservationId,
            facility: facilityInfo.name,
            image: facilityInfo.image,
            date, 
            location: facilityInfo.location,
            numPeople,
            affiliation: facilityInfo.affiliation,
            purpose
        }
        let reservations = JSON.parse(localStorage.getItem("reservations")) || [];  
        reservations.push(reservation);
        localStorage.setItem("reservations", JSON.stringify(reservations));

        window.alert("Reservation Submitted!");

        //reset fields after submission
        setDate("");
        setNumPeople("");
        setAffiliation("");
        setPurpose("");
        setSelectedFacility("0");
    };

    console.log(localStorage.getItem("reservations"));
    return (    //brought from the htmlfile for the first assignment
        <div style={ {paddingLeft: "10%"} }>
            <h1><strong>  Facility Reservation</strong></h1>
            <form onSubmit={submission}>
                <div style={ {width: "30%"} }>
                    <label htmlFor="selectfacility" className="form-label">Select Facility</label>
                    <select name="selectfacility" id="selectfacility" className="form-select" value={selectedFacility} 
                    onChange={(sel) => {    //facility selection. takes the value of the facility that user selected
                                            //and find thru facilities if facil.value === selecValue
                        const selectedValue = sel.target.value;
                        setSelectedFacility(selectedValue);
                        const selectedFacility = facList.find(facility => facility.value === selectedValue);
                        setFacilityInfo(selectedFacility);
                    }}>
                        
                         {facList.map((facility) => ( //using map, find matching value (selectedFacility)
                            <option key={facility.value} value={facility.value}>
                            {facility.name}
                            </option>
                    ))}
                    </select>
                </div>
                <div>
                    <img id="facilityImage" src={facilityInfo.image} alt={facilityInfo.name} style={{ width: "50%", marginTop: "10px"}} />
                    <p><strong>{facilityInfo.name}</strong></p>
                    <p><i className="bi bi-people"> {facilityInfo.mincapacity} - {facilityInfo.maxcapacity}</i></p>
                    <p><i className="bi bi-map"> {facilityInfo.location}</i></p>
                    <p><i className="bi bi-info"> {facilityInfo.affiliation}</i></p>
                </div>
                <div style={ {width: "40%"} }>
                    <label htmlFor="date" className="form-label">Date to be Used:</label>
                    <input type="date" className="form-control" 
                     id="date" value={date} onChange={(selectedDate) => setDate(selectedDate.target.value)} />
                </div>
                <div style={ {width: "40%"} }>
                    <p></p>
                    <label htmlFor="NumberofPeople" className="form-label">Number of People:</label>
                    <input type="number" className="form-control" id="NumberofPeople" value={numPeople}
                        onChange={(userAns) => setNumPeople(userAns.target.value)} />
                </div>
                <div>
                    <label className="form-label">Are you affiliated with SUNY Korea?</label><br />
                    <label htmlFor="checkYes" className="form-check-label">Yes</label>
                    <input type="radio" id="checkYes" className="form-check-input" value="Yes" checked={affiliation === "Yes"} onChange={(userAns) => checkAffiliation(userAns.target.value)} />
                    <label htmlFor="checkNo" className="form-check-label ms-3">No</label>
                    <input type="radio" id="checkNo" className="form-check-input" value="No" checked={affiliation === "No"} onChange={(userAns) => checkAffiliation(userAns.target.value)} />
                </div>
                <div style={ {width: "50%"} }>
                    <label htmlFor="purpose" className="form-label">Purpose of Use:</label>
                    <input type="text" className="form-control" id="purpose" value={purpose} onChange={(userAns) => setPurpose(userAns.target.value)} />
                </div>
                <button type="submit" className="btn btn-outline-primary" style={{ marginTop: "10px"}}>Submit</button>
            </form>
        </div>
    );
};

export default Reservation;