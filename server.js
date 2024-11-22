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

    let query = 
        `INSERT INTO login (
            email, 
            userName, 
            pw
        ) VALUES(
            '${email}',
            '${userName}',
            '${pw}'
        )`;
    con.query(query, (err, result) => {
        if(err)
            console.error("inserting login data error", err);
        res.json(result);
    })
});

//get for sign-up
app.get('/sign-up', (req, res) => {
    const query = "SELECT * FROM login";

    con.query(query, (err, results) => {
        if(err)
            console.error("error fetching email");
        res.json(results);
    })
});

//post for sign-in
app.post('/sign-in', (req, res) => {
    const { email, pw} = req.body;
    const hashpw = hashutil(email, pw);

    con.query("SELECT pw FROM login WHERE email =?", [email], (err, result) => {
        //query error
        if(err)
            return res.status(500).send("server error occured");
        //no email value or no password matching
        if(result.length === 0 || result[0].pw !== hashpw)
            return res.status(400).send("Wrong email or password!");
        //every condition met, login success
        res.status(200).send("Sign in success!");
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost: ${PORT}`);
});