var express = require('express');
var mysql = require('mysql2');

var router = express.Router();

router.get('/', function(req, res, next) {

    const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'kolokol1',
        database: 'mdb'
        })
    db.query('SELECT COUNT(id) AS liczbazamowien FROM zamowienia; ', function (error, results) {
        if (error) throw error;
        res.render('index', {title: 'Piano4U', results:results[0]['liczbazamowien']});
        console.log(results);
    });
});

module.exports = router;