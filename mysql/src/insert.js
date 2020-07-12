var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "node",
  password: "node",
  database: "nodedb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  var sql = "INSERT INTO workers (name, category, salary) VALUES ?";
  var values = [
    ['Ben', 'C++', 13000],
    ['William', 'Perl', 11800],
    ['Tiffany', 'C++', 14000],
    ['Viola', 'C++', 13400]
  ];

  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
});