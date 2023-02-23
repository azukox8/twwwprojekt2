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
var pianina = [
    { model: 'Yamaha P35', opis: "To poprzednik Yamahy P45 różniący się od tej wersji praktycznie wyłącznie tzw. maksymalną polifonią: 32 dźwięki zamiast 64. Posiada klawiaturę młoteczkową.", cena: "129zł/mc", src:"images/p35.jpg"},
    { model: 'Yamaha P45', opis: "To najnowszy, podstawowy model Yamahy z serii P. Posiada klawiaturę młoteczkową.", cena: "139zł/mc", src:"images/p45.jpg"},
    { model: 'Korg SP250', opis: "Pianino w komplecie posiada metalowe nogi przymocowane z boku na wzór nóg drewnianych oraz przymocowany pedał. Posiada bardziej rozbudowaną paletę barw w porównaniu np. do Yamahy.", cena: "129zł/mc", src:"images/sp250.jpg"},
    { model: 'Roland F20', opis: "Pianino charakteryzuje się nieco cięższą klawiaturą od większości modeli Yamahy serii P. Posiada możliwość skorzystania z inteligentnego akompaniamentu.", cena: "139zł/mc", src:"images/f20.jpg"},
    { model: 'Yamaha P120', opis: "To 'kultowe', profesjonalne pianino z wysokiej klasy klawiaturą Yamahy Clavinova. W zestawie posiada 'duży' pedał Yamaha.", cena: "139zł/mc", src:"images/p120.jpg"},
    { model: 'Yamaha DGX 650', opis: "To pianino cyfrowe z wieloma funkcjami keyboardu. Dzięki temu nie tylko można wykorzystywać bogate możliwości akompaniamentu, ale też korzystać z bardzo szerokiej gamy dźwięków.", cena: "149zł/mc", src:"images/dgx650.jpg"}
  ];
router.get('/', function(req, res, next) {
    res.render('pianina', {title: 'Piano4U - Pianina', pianina: pianina});
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
        title: 'Piano4U - Pianina',
        pianina: pianina
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