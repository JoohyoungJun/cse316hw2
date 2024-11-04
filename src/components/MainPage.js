/*
Name: Joohyoung Jun
Email: joohyoung.jun@stonybrook.edu
*/
import React from 'react';

const MainPage = () => {
    return (
        <div class="container">
            <h1><strong>Facility Reservation</strong></h1>
            <p>Facility List</p>
            <ol>
            <li>Reservation Date should be the day after today.</li>
                <li>The number of users should be between the maximum number 
                    of people and the minimum number of people.
                </li>
                <li>If the facility is available only for SUNY Korea, 
                    user should be in SUNY Korea.
                </li>
                <li>The reservation date must be made on the available day of the week.</li>
                <li>The same person cannot book another facility on the same date.</li> 
            </ol>
            <p>If all conditions are met, data is stored in local storage.</p>
            <h1><strong>User Information</strong></h1>
            <ol>
                <li>User profile, user email, user password, user name.</li>
                <li>All other details can be modified except for the user email</li>
                <li>If the user profile is changed, the image in the navbar will also change.</li>
            </ol>
            <h1><strong>Reservation History</strong></h1>
            <p>Load the reservation data stored in the local storage.</p>
            <p>reservation id, facility name, purpose, peopleNum, isSuny, booker name, date</p>
            <p>Can cancel reservation</p>
        </div>
    );
};

export default MainPage;