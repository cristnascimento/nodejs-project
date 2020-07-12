var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "node",
  password: "node",
  database: "nodedb"
});

con.connect(function(err) {
  if (err) throw err;
  var sql = "UPDATE workers SET salary = 13100 WHERE name = 'Bob'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  });
});