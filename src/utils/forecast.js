const request = require('request')

// //------------- callBack -------------
const forecast = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=acfb2bf669b0f76f44aea86132fe3336&query=' + address

    request({ url: url, json:true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location, try another location.', undefined)
        } else {
            callback(undefined, printforecastData(body.location.name, body.location.country,
                                body.current.temperature, body.current.weather_descriptions)
            )
        }
    })
}

const printforecastData = (name, country, temperature, weather_descriptions) => {
    return (name+ ", " + country + ". It's currentlly " + 
        temperature + "℃ degress out. The weather description: " + weather_descriptions)
}


module.exports = forecast