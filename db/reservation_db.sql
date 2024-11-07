CREATE DATABASE reservation_db;

USE reservation_db;

CREATE TABLE reservations (
    --id, facility, image, date, location, numPeople, affiliation, purpose
    id INT NOT NULL,
    facility VARCHAR(100) NOT NULL,
    date Date NOT NULL,
    numPeople INT NOT NULL,
    affiliation VARCHAR(100) NOT NULL,
    purpose VARCHAR(100) NOT NULL

);