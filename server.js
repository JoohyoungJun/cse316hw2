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
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

dotenv.config();
const { sign } = jwt;

//arrays for refresh tokens
let refreshTokens = [];

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(cookieParser());
app.use((req, res, next) => {
    /*
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    */
    next();
});

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
app.get('/reservations', authenticateToken, (req, res) => {
    const query = "SELECT * FROM reservations";

    con.query(query, (err, result) => {
        if (err) {
            console.error("Error fetching reservations: ", err);
            return res.status(500).json({message: "Failed to Fetch reservation"});
        }
        console.log("reservation fetching success", result);
        res.status(200).json(result);
        });
});

// DELETE for reservations
app.delete('/reservations/:id', authenticateToken, (req, res) => {
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
    console.log("req body: ", req.body);
    const hashpw = hashutil(email, pw);
    console.log("hashpw: ", hashpw);

    con.query("SELECT email, userName, pw FROM login WHERE email =?", [email], (err, result) => {
        //query error
        if(err) {
            console.error("query error: ", err);
            return res.status(500).send("server error occured");
        }
        //no email value or no password matching
        if(result.length === 0 || result[0].pw !== hashpw)
            return res.status(400).json({ message: "Wrong email or password!" });

        //generate access token and refresh token
        const user = { email: result[0].email, userName: result[0].userName };
        const accessToken = generateAccessToken(user);
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);

        //save refreshToken
        refreshTokens.push(refreshToken);

        //every condition met, login success
        //res.status(200).send("Sign in success!");
        console.log("Access Token: ", accessToken);
        console.log("Refresh token", refreshToken);
        res.status(200).json({ accessToken, refreshToken, message: "Sign-in Success!" });
    });
});

//post for sign-out
app.post('/sign-out', (req, res) => {
    const refreshToken = req.body.token;

    //remove refresh token using filter
    refreshTokens = refreshTokens.filter(token => token !== refreshToken);

    console.log("Refresh token removed:", refreshToken);

    res.status(200).json({ message: "Sign-out success!" });
});

//post for refreshToken
app.post('/token', (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken === null) return res.sendStatus(401);
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken( {email: user.email});
        res.json({accessToken: accessToken});
    })
})

function generateAccessToken(user){
    console.log("generating access token: ", user);
    return sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    console.log("Authorization header received:", authHeader); // check authheader

    const token = authHeader && authHeader.split(' ')[1];
    console.log("Extracted token:", token); // check token

    if (token == null) {
        console.log("No token provided in Authorization header.");
        return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log("Token verification failed:", err.message);
            return res.status(403).json({ message: "Token is invalid or expired" });
        }

        req.user = user;
        console.log("Token verified successfully:", user);
        next();
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost: ${PORT}`);
});