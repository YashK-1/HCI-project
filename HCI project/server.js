const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'E%?ZltH9f7VR8q(^',
    database: 'sportscomp'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

app.post('/register', (req, res) => {
    const { firstName, lastName, age, sport, date } = req.body;
    const sql = 'INSERT INTO registrations (firstName, lastName, age, sport, date_of_birth) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [firstName, lastName, age, sport, date], (err, result) => {
        if (err) throw err;
        console.log('Registration successful');
        res.send('Registration successful');
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
