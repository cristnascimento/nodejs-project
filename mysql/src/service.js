var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "node",
  password: "node",
  database: "nodedb"
});

const getWorkers = function (callback) {
  con.query("SELECT * FROM workers", function (err, result, fields) {
    if (err) throw err;
    callback(result);
  });
}

const getWorker = function (name, callback) {
  con.query("SELECT * FROM workers where name = ?", name, function (err, result, fields) {
    if (err) throw err;
    callback(result);
  });
}

service = {
    getWorkers: getWorkers,
    getWorker: getWorker,
};

module.exports = service;
