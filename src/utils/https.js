
const https = require("web-server/src/utils/https");

const options = {
    "method": "GET",
    "hostname": "community-open-weather-map.p.rapidapi.com",
    "port": null,
    "path": "/weather?callback=test&id=2172797&units=%2522metric%2522%20or%20%2522imperial%2522&mode=xml%252C%20html&q=tehran",
    "headers": {
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        "x-rapidapi-key": "59bf7bb112msha39d7384b4d272cp11ea20jsn1d6ab32cf1be",
        "useQueryString": true
    },
    json:true
};

const req = https.request(options, function (res) {
    let chunks = '';

    res.on("data", function (chunk) {
        chunks =chunks + chunk.toString()
    });

    res.on("end", function () {
        // var body = Buffer.concat(chunks);
        const body = JSON.parse(chunks);
        console.log(body);
    });
});
req.on('error',(err)=>{
    console.log('asadaf',err);
});
req.end();
