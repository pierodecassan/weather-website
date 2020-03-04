const request = require('request');
const token = 'pk.eyJ1IjoicGlldHJvZGVjYXNzYW4iLCJhIjoiY2s2czAzcnFiMGFvYzNmcGd0c2Z4bnE0byJ9.Y83Fx-ggB1o9e5XRgyrvSQ';

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token='+token+'&limit=1';
    
    request({url, json:true},(error, {body}) => {
        if(error){
        callback('Unable to connect to the Maps Service!',{ longitude: undefined, latitude: undefined, location: undefined});
        } else if (body.features.length===0) {
        callback('Error in getting maps data', { longitude: undefined, latitude: undefined, location: undefined});
        } else  {
        callback(undefined, {
            latitude:body.features[0].center[1],
            longitude:body.features[0].center[0],
            location:body.features[0].place_name
        } 
            );
      
        }
    })


}

module.exports = geocode;

