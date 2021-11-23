
const request = require('request')

const geocode = (address, callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoiZmFyZWVkc3VyaSIsImEiOiJja3c5aHEzNjQzcHliMnZtcXBuY3pmNWQ1In0.6gpIDBTCnXpca-p6Ntt8wg&limit=1"
    request({url,json:true},(error,{body})=>{
        console.log(body.features.length)
        if (error) {
            callback('unable to connect to location services !',undefined)
        } else if (body.features.length === 0){
            callback('uanble to find location',undefined)
        } else {
            callback(undefined,{
                longitude: body.features[0].geometry.coordinates[0],
                latitude: body.features[0].geometry.coordinates[1], 
                location: body.features[0].place_name
            })
        }
    })
}

module.exports =  geocode

