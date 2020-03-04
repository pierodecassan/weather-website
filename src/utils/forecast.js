const request = require('request');

const forecast = (latitude, longitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/3c17a9e7262a00d14bb1b458439b0246/'+latitude+','+longitude+'?units=si&lang=it';

    request({url, json:true},(error, {body}) => {
        if(error){
        callback('Unable to connect to the Google API!',undefined);
        } else if (body.error) {
            callback(body.error, undefined)
            }
        else {
 
        callback(undefined, {
            precipProbability:body.daily.data[0].precipProbability,
            summary:body.daily.data[0].summary,
            temperature:body.daily.data[0].temperatureLow,
            icon:body.daily.data[0].icon,
        }

            )
        }
    })


}

module.exports = forecast;
