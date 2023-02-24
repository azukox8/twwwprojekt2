const mysql = require('mysql2');

module.exports = function dobazy(){ return new Promise((resolve, reject) => {
    const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'kolokol1',
        database: 'mdb'
    })
    db.connect((error) => {
        if (error) { reject(error); }
        else {
            resolve(db);
        }
    });
});
};