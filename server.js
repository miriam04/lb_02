/*
Drittanbieter
 */

'use strict';

let express = require("express");
let bodyParser = require("body-parser");
const path = require('path');
let app     = express();
const { v4: uuidv4 } = require('uuid');
const UserRepository = require('./UserRepository');
const Validation = require('./ValidationService');


const port = process.env.PORT || 3000;
const server = app.listen(port);
console.log(`Running at Port ${port}`);
server.timeout = 1000 * 60 * 2; // 2 minutes

//Warning: Korrekt setzen!!
const staticPath = './data/';
const registrationFile = staticPath+'registration.json';


// Use middleware to set the default Content-Type
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', 'http://localhost:63342');
    next();
});

app.use(express.static(__dirname + '/public'));

//test uuid
app.get('/test1', (req, res) => {
    const id = uuidv4();
    res.send(id);
});

app.get('/', (req, res) => {
    res.header('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, '/index.html'));
})

// necessary for posting data
// support json encoded bodies
app.use(bodyParser.json());
// support encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

/*  1. Writing to file
    https://stackabuse.com/reading-and-writing-json-files-with-node-js/
 */

app.post('/register', (req, res) => {

    const HTTP_STATUS_NO_ACCEPTABLE = 406;
    //Daten des Posts-Requests auslesen und zusätzlich eine User-id erzeugen
    let userObj = {
        "id": uuidv4(),
        "nachname": req.body.user.nachname,
        "email": req.body.user.email,
        "personenanzahl": req.body.user.personenanzahl,
        "datum": req.body.user.datum,
        "password": req.body.user.password
    }

    let result = Validation.validateUser(userObj);
    if (result.isNotValid) {
        res.status(HTTP_STATUS_NO_ACCEPTABLE).send(result.msg);
    } else {
        //Speicherung des neuen Benutzers
        let userRepo = new UserRepository(registrationFile);
        userRepo.read()
            .then((data) => {
                //log data for analysis
                console.log(userObj);
                data.push(userObj);
                return data;
            })
            .then(data => userRepo.save(data))
            .catch(error => {
                console.error(error);
            });
        res.status(201).send(`User ${userObj.nachname} inserted!`);
    }
});