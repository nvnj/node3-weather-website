const request = require('request')

const geocode = (location, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=eeec298d87ba69395dc26f5ed56b74d1&query=' + encodeURIComponent(location)

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to the weather services', undefined)
        }

        else if (response.body.error) {
            callback(response.body.error, undefined)
        }
        else {
            callback(undefined,{
                forecast: 'It is currently ' + response.body.current.temperature + ' degrees out.There is a ' + response.body.current.precip + '% chance of rain',
            })
        }
        // {const data = response.body
        // temp = data.current.temperature
        // prec = data.current.precip
        // console.log('It is currently ' + temp+' degrees out.There is a '+prec+'% chance of rain')}
    })
}

module.exports = geocode