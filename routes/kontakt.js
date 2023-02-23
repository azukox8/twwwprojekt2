var express = require('express');
var parser = require('body-parser');
var mysql = require('mysql2');
var router = express.Router();
router.use(parser.urlencoded({
    extended: false
 }));
router.use(parser.json())
router.use(function(req,res,next){
    res.locals.userValue = null;
    next();
})
router.get('/', function(req, res, next) {
    res.render('kontakt', {title: 'Piano4U - Kontakt'});
});

router.post('/',function(req,res){
    var kontakt = {
        first : req.body.firstname,
        last : req.body.lastname,
        subject : req.body.subject,

    }
    console.log(kontakt);
    res.render('kontakt',{
        userValue : kontakt,
        title: 'Piano4U - Kontakt'
    });
     
    const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'kolokol1',
        database: 'mdb'
        })
        
    const newRecord = { ID: null, imie: kontakt.first, nazwisko: kontakt.last, subject: kontakt.subject};
    db.query('INSERT INTO kontakt SET? ', newRecord, function (error, results) {
        if (error) throw error;
        console.log(results);
    });
});


module.exports = router;