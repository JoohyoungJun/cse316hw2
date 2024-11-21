/*
import { hashutil } from './util/hashutil';
Name: Joohyoung Jun
Email: joohyoung.jun@stonybrook.edu
*/

/*
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const { hashutil } = require('./util/hashutil');
*/

import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import { hashutil } from './src/util/hashutil.js';

const PORT = 3001;
const app = express();

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
    const { reservationId, reservationDate, userNum, isSK, purpose, reservationName, userName, imageSrc, reservationLocation} = req.body;
    
    let query = 
    `INSERT INTO reservations (
        reservationId,
        reservationDate,
        userNum,
        isSK,
        purpose,
        reservationName,
        userName,
        imageSrc,
        reservationLocation
    ) VALUES (
        ${reservationId},
        '${reservationDate}',
        ${userNum},
        ${isSK},
        '${purpose}',
        '${reservationName}',
        '${userName}',
        '${imageSrc}',
        '${reservationLocation}'
    )`;

    con.query(query, (err, result) => {
        if (err) 
            throw err;
        res.json(result);
    });
});

//GET for reservations
app.get('/reservations', (req, res) => {
    const query = "SELECT * FROM reservations";

    con.query(query, (err, result) => {
        if (err) 
            throw err;
        res.json(result);
    });
});

// DELETE for reservations
app.delete('/reservations/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM reservations WHERE reservationId = ?`;

    con.query(query, [id], (err, result) => {
        if (err) 
            throw err;
        res.json(result);
    });
});

//post for sign-up
app.post('/sign-up', (req, res) => {
    const { email, pw, userName } = req.body;

    //hash email and password using hashutil.js
    const hashpw = hashutil(email, pw);

    //save hashed password into login table in reservation_db
    let query = 
        `INSERT INTO login (
            email, 
            userName, 
            pw
        ) VALUES(
            '${email}',
            '${userName}',
            '${hashpw}'
        )`;
    con.query(query, (err, result) => {
        if(err)
            console.error("inserting login data error", err);
        res.json(result);
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost: ${PORT}`);
});