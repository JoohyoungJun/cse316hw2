/*
Name: Joohyoung Jun
Email: joohyoung.jun@stonybrook.edu
*/
import React from "react";
import "../App.css";

const FacilityList = () => {
    return (
        <div style={ {paddingLeft: "10%"}}>
            <h1><strong>  Facility List</strong></h1>
            <div className="row">
                <div className="card" style={ {width:"30%"} }>
                    <img src="/assignImage/gym.jpg" alt="Gym" className="card-img-top" />
                    <div className="card-body">
                        <h3><strong>Gym</strong></h3>
                        <p>place used for physical activity</p>
                        <p><i className="bi bi-calendar"> Mon, Tue, Wed, Thu, Fri, Sat, Sun</i></p>
                        <p><i className="bi bi-people"></i> 1 - 4</p>
                        <p><i className="bi bi-map"> C1033</i></p>
                        <p><i className="bi bi-info"> Available to all</i></p>
                    </div>
                </div>
                <div className="card" style={ {width:"30%"} }>
                    <img src="/assignImage/pool.jpg" alt="Pool" className="card-img-top" />
                    <div className="card-body">
                        <h3><strong>Swimming Pool</strong></h3>
                        <p>Aquatic Center</p>
                        <p><i className="bi bi-calendar"> Mon, Tue, Wed, Thu, Fri, Sat, Sun</i></p>
                        <p><i className="bi bi-people"></i> 1 - 4</p>
                        <p><i className="bi bi-map"> C1033</i></p>
                        <p><i className="bi bi-info"> Available to all</i></p>
                    </div>
                </div>
                <div className="card" style={ {width:"30%"} }>
                    <img src="/assignImage/conference.jpg" alt="Conference Room" className="card-img-top" />
                    <div className="card-body">
                        <h3><strong>Conference Room</strong></h3>
                        <p>Meeting Space</p>
                        <p><i className="bi bi-calendar"> Mon, Tue, Wed, Thu, Fri, Sat, Sun</i></p>
                        <p><i className="bi bi-people"></i> 1 - 4</p>
                        <p><i className="bi bi-map"> C1033</i></p>
                        <p><i className="bi bi-info"> Only for SUNY Korea</i></p>
                    </div>
                </div>
                <div className="card" style={ {width:"30%"} }>
                    <img src="/assignImage/auditorium.jpg" alt="Auditorium" className="card-img-top" />
                    <div className="card-body">
                        <h3><strong>Auditorium</strong></h3>
                        <p>The Auditorium Theater</p>
                        <p><i className="bi bi-calendar"> Mon, Tue, Wed, Thu</i></p>
                        <p><i className="bi bi-people"></i> 10 - 30</p>
                        <p><i className="bi bi-map"> A234</i></p>
                        <p><i className="bi bi-info"> Available to all</i></p>
                    </div>
                </div>
                <div className="card" style={ {width:"30%"} }>
                    <img src="/assignImage/seminar.jpg" alt="Seminar Room" className="card-img-top" />
                    <div className="card-body">
                        <h3><strong>Seminar Room</strong></h3>
                        <p>Lecture Hall</p>
                        <p><i className="bi bi-calendar"> Mon, Tue, Wed, Thu</i></p>
                        <p><i className="bi bi-people"></i> 1 - 4</p>
                        <p><i className="bi bi-map"> C1033</i></p>
                        <p><i className="bi bi-info"> Available to all</i></p>
                    </div>
                </div>
                <div className="card" style={ {width:"30%"} }>
                    <img src="/assignImage/library.jpg" alt="Library" className="card-img-top" />
                    <div className="card-body">
                        <h3><strong>Library</strong></h3>
                        <p>Study and Read Books</p>
                        <p><i className="bi bi-calendar"> Mon, Tue, Wed, Thu, Fri, Sat, Sun</i></p>
                        <p><i className="bi bi-people"></i> 1 - 4</p>
                        <p><i className="bi bi-map"> C1033</i></p>
                        <p><i className="bi bi-info"> Only for SUNY Korea</i></p>
                    </div>
                </div>
            </div>
        </div> 
    );
};

export default FacilityList;