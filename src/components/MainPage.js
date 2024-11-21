/*
Name: Joohyoung Jun
Email: joohyoung.jun@stonybrook.edu
*/
import React from 'react';

const MainPage = () => {
    return (
        <div class="container">
            <ul>
                <li>
                    <h2><strong>Facility List</strong></h2>
                    <p></p>
                    <p>Show list of faciliities.</p>
                    <p></p>
                    <p>name, description, location, min capacity, max capacity, image, 
                        onlySUNY, available day of the week
                    </p>
                </li>
                <li>
                    <h2><strong>Facility Reservation</strong></h2>
                    <ol>
                        <li>Reservation Date should be the date after today</li>
                        <li>The number of users should be between the maximu number of people
                            and the minimum number of people
                        </li>
                        <li>If the facility is available only for SUNY Korea, user should be 
                            in SUNY Korea
                        </li>
                        <li>If someone booked the facility on that date, no one elese can book the 
                            facility on that date
                        </li>
                        
                    </ol>
                    <p></p>
                    <p>If all conditions are met, data is stored in the database</p>
                </li>
                <li>
                    <h2><strong>User</strong></h2>
                    <ul>
                        <li>
                            <p>User Info</p>
                        </li>
                        <li>
                            <p>Reservation History</p>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default MainPage;