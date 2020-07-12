var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "node",
  password: "node"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});