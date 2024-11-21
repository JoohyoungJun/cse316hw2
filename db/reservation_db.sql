CREATE DATABASE IF NOT EXISTS reservation_db;
USE reservation_db;

CREATE TABLE facilities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    facilityName VARCHAR(100) NOT NULL,
    facilityDscr TEXT,
    imageSrc VARCHAR(255) NOT NULL,
    availableDays VARCHAR(100),
    minCap INT,
    maxCap INT,
    location VARCHAR(100),
    onlySKFlag BOOLEAN
);

INSERT INTO facilities (facilityName, facilityDscr, imageSrc, availableDays, minCap, maxCap, location, onlySKFlag)
VALUES 
('Gym', 'Place used for physical activity', '/assignImage/gym.jpg', 'Mon, Tue, Wed, Thu, Fri, Sat, Sun', 1, 4, 'C101', false),
('Swimming Pool', 'Aquatic Center', '/assignImage/pool.jpg', 'Mon, Tue, Wed, Thu, Fri, Sat, Sun', 1, 4, 'C102', false),
('Conference Room', 'Meeting Space', '/assignImage/conference.jpg', 'Mon, Tue, Wed, Thu, Fri, Sat, Sun', 1, 4, 'B101', true),
('Auditorium', 'The Auditorium Theater', '/assignImage/auditorium.jpg', 'Mon, Tue, Wed, Thu', 10, 30, 'A101', false),
('Seminar Room', 'Lecture Hall', '/assignImage/seminar.jpg', 'Mon, Tue, Wed, Thu', 1, 4, 'B201', false),
('Library', 'Study and Read Books', '/assignImage/library.jpg', 'Mon, Tue, Wed, Thu, Fri, Sat, Sun', 1, 4, 'B301', true);

CREATE TABLE IF NOT EXISTS reservations (
    reservationId BIGINT PRIMARY KEY,
    reservationDate DATE,
    userNum INT,
    isSK BOOLEAN,
    purpose VARCHAR(255),
    reservationName VARCHAR(100),
    userName VARCHAR(100),
    imageSrc VARCHAR(100),
    reservationLocation VARCHAR(100)
);

CREATE TABLE login (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    userName VARCHAR(255) NOT NULL,
    pw VARCHAR(255) NOT NULL
);