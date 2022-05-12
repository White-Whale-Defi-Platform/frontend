// Usage: node <script_name> <port>
// Example: node health_check.js 3000
var http = require("http");

var options = {  
    host : "localhost",
    port : process.argv[2],
    timeout : 2000
};

var request = http.request(options, (res) => {  
    console.log(`STATUS: ${res.statusCode}`);
    if (res.statusCode == 200) {
        process.exit(0);
    }
    else {
        process.exit(1);
    }
});

request.on('error', function(err) {  
    console.log('ERROR');
    process.exit(1);
});

request.end(); 