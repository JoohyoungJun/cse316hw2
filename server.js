const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3001;
const cors = require('cors');

app.use(express.json());
app.use(cors());

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "wjswngud!!30",
    database: "reservation_db"
    
});

con.connect(function(err) {
    if (err) throw err;
    console.log("connected!");
});

//GET for facilities
app.get('/facilities', (req, res) => {
    con.query("SELECT * FROM facilities", (err, results) => {
        if (err) throw err;
        res.json(results);
    })
});

//POST for reservations
app.post('/reservations', (req, res) => {
    const { reservationId, reservationDate, userNum, isSK, purpose, reservationName, userName} = req.body;
    
    let query = 
    `INSERT INTO reservations (
        reservationId,
        reservationDate,
        userNum,
        isSK,
        purpose,
        reservationName,
        userName
    ) VALUES (
        ${reservationId},
        '${reservationDate}',
        ${userNum},
        ${isSK},
        '${purpose}',
        '${reservationName}',
        '${userName}'
    )`;

    con.query(query, (err, result) => {
        if (err) {
            console.error("Error inserting reservation: ", err);
            res.status(500).send("Error inserting reservation");
            return;
        }
        res.json({ message: 'Reservation added successfully'});
    });
});

//GET for reservations
app.get('/reservations', (req, res) => {
    const query = "SELECT * FROM reservations";

    con.query(query, (err, result) => {
        if (err) {
            console.error("Error fetching reservations: ", err);
            res.status(500).send("Error fetching reservations");
            return;
        }
        res.json(result);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost: ${PORT}`);
});