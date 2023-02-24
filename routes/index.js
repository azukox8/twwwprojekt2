var express = require('express');
var mysql = require('mysql2');
var dobazy = require('../baza');
var router = express.Router();

router.get('/',function (req, res, next) {
    dobazy().then((db) => {
        const query = 'SELECT COUNT(id) AS liczbazamowien FROM zamowienia;';
        db.query(query, function (error, results) {
            if (error) throw error;
            console.log(results);
            res.render('index', { title: 'Piano4U', year: '2023', results: results[0]['liczbazamowien'] });
        });

    }).catch((err) => {
        results = null;
        res.render('index', { title: 'Piano4U', year: '2023', results:null });
        console.error(err);}
    );
});

module.exports = router;