const service = require("./service");

service.getWorkers(function(result) {
    console.log("Client");
    console.log(result);
});

service.getWorker("Mark", function(result) {
    console.log("Client");
    console.log(result);
});
