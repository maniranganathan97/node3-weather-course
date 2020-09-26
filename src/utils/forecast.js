const postman = require('postman-request')



const forecast =(latitude,longitute,callBack) => {
    const url = "http://api.weatherstack.com/current?access_key=dba30753c9c31c6fc4b534c20dc2d027&query="+latitude+','+longitute+"&units=m";

    postman.get(url, function(error, response, body){
        if(error){
            callBack('Unable to connect Internet!', undefined)
        }else if(body.error){
            callBack('Unable to find Location', undefined)
        }
        else{
            const data = JSON.parse(response.body)
            // console.log(data)
            callBack(undefined, data.current.weather_descriptions+": The current tempearture is "+data.current.temperature+" and its feels like "+ data.current.feelslike)
        }

    });
}

module.exports=forecast;