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
    res.render('pianina', {title: 'Piano4U - Pianina'});
});
router.post('/',function(req,res){
    var zamowienie = {
        first : req.body.imie1,
        last : req.body.nazwisko1,
        email : req.body.email,
        okres : req.body.okres,
        model : req.body.pianinowybierz
    }
    console.log(zamowienie);
    res.render('pianina',{
        userValue : zamowienie,
        title: 'Piano4U - Pianina'
    });

    const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'kolokol1',
        database: 'mdb'
        })
    const newRecord = { ID: null, imie: zamowienie.first, nazwisko: zamowienie.last, email: zamowienie.email, okres: zamowienie.okres, model: zamowienie.model };
    db.query('INSERT INTO zamowienia SET? ', newRecord, function (error, results) {
        if (error) throw error;
        console.log(results);
    });
     
});
module.exports = router;