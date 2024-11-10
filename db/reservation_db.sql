CREATE DATABASE reservation_db;

USE reservation_db;

CREATE TABLE facilities (
    --id, facilityName, facilityDscr, imageSrc, availableDays, minCap, maxCap, 
    --location, onlySKFlag
    id INT AUTO_INCREMENT PRIMARY KEY,
    facilityName VARCHAR(100) NOT NULL,
    facilityDscr TEXT, 
    imageSrc VARCHAR(255), 
    availableDays VARCHAR(100),
    minCap INT,
    maxCap INT,
    location VARCHAR(100),
    onlySKFlag BOOLEAN
);

CREATE TABLE reservations(
    --reservationId, reservationDate, userNum, isSK
    --purpose, reservationName, userName
    reservationId INT NOT NULL,
    reservationDate DATE,
    userNum INT,
    isSK BOOLEAN,
    purpose VARCHAR(255),
    reservationName VARCHAR(100),
    userName VARCHAR(100)
);