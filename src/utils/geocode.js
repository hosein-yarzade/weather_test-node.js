const request = require('request');
const geocode =(name_city ,callback)=>{
    var options = {
        method: 'GET',
        url: 'https://community-open-weather-map.p.rapidapi.com/find',
        qs: {type: 'link%2C accurate', units: 'imperial%2C metric', q: name_city},
        headers: {
            'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
            'x-rapidapi-key': '59bf7bb112msha39d7384b4d272cp11ea20jsn1d6ab32cf1be',
            useQueryString: true
        },
        json:true
    };

    request(options, (error, response) =>{
        // const data =JSON.parse(response.body);
        // if (error) throw new Error(error);
        if (error) {
            console.log('ss',error);
            callback('unable connect enternet ', undefined)
        } else if (response.body.error) {
            console.log(response.body.error);
            callback('undefind location', undefined)
        } else {
            const data = response.body;
            callback(undefined , data);
            // console.log(data);
        }

        // console.log(data);
    });
};

module.exports = geocode;
