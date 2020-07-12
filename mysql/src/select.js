var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "node",
  password: "node",
  database: "nodedb"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM workers", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});