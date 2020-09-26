const postman = require('postman-request');



const geoCode = (address, callBack) =>{
    const url ="https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoibWFuaXIxMzg5IiwiYSI6ImNrZmNxa3lpYzAzcm0yeW5zZmpteWsxdWkifQ.EIyvdU9XZ3udhwW9itqToQ"
    postman.get(url, function(error, response, body){
        // console.log(body)
        const JSONbody = JSON.parse(body);
        // console.log(JSONbody)
        if(error){
            callBack('please check url', undefined)
        }
        else if(JSONbody.features.length === 0){
            callBack('provide another value', undefined)
        }
        else{
            callBack(undefined, {
                latitude: JSONbody.features[0].center[1],
                longitude: JSONbody.features[0].center[0],
                location: JSONbody.features[0].place_name
            })
            
        }
      
    })
}

module.exports=geoCode
