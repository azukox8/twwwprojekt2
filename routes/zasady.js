var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('zasady', {title: 'Piano4U - Zasady'});
});

module.exports = router;