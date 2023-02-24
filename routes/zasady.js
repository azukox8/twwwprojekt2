var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('zasady', {title: 'Piano4U - Zasady', year:'2023'});
});

module.exports = router;