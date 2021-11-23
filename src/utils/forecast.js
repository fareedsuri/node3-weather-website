const request = require('request')



const forecast = (longitude,latitute,callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=192071687c5321e4699f56975458df02&query="+encodeURIComponent(longitude)+","+encodeURIComponent(latitute)+",-118.2439&units=f"
    request({url,json:true},(error,{body})=>{
        if (error){
            callback("unable to connect",undefined)
        } else if (body.error) {
            callback('cannot find location:'+url, undefined)
        } else {
            callback(undefined,{
                temp: body.current.temperature,
                feels: body.current.feelslike,
                wind: body.current.wind_speed})
        }
    })
}

module.exports = forecast