var express = require('express');
var parser = require('body-parser');
var router = express.Router();
const dobazy = require('../baza');

router.use(parser.urlencoded({
    extended: false
}));
router.use(parser.json())
router.use(function (req, res, next) {
    res.locals.userValue = null;
    next();
})
router.get('/', function (req, res, next) {
    res.render('kontakt', { title: 'Piano4U - Kontakt', year: '2023', blad: null });
});

router.post('/', function (req, res) {
    var kontakt = {
        first: req.body.firstname,
        last: req.body.lastname,
        subject: req.body.subject,

    }
    console.log(kontakt);
    dobazy().then((db) => {
        const newRecord = { ID: null, imie: kontakt.first, nazwisko: kontakt.last, subject: kontakt.subject, data: new Date() };
        db.query('INSERT INTO kontakt SET? ', newRecord, function (error, results) {
            if (error) throw error;
            console.log(results);
        });
        res.render('kontakt', { userValue: kontakt, title: 'Piano4U - Kontakt', year: '2023', blad: null });


    }).catch((err) => {
        res.render('kontakt', { userValue: kontakt, title: 'Piano4U - Kontakt', year: '2023', blad: err });
        console.error(err);
    }
    );
});


module.exports = router;