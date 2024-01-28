// import axios from "axios"


const axios = require("axios")


const weatherTemp = async(lo, la, Rdays, key) => {
    if(Rdays < 0) {
            const errMsg = {
                message: "Date cannot be in the past",
                error: true
            }
            return errMsg
        }

    if(Rdays > 0 && Rdays <= 7) {
        const {data} = await axios.get(`https://api.weatherbit.io/v2.0/current?lat=${la}&lon=${lo}&units=M&key=${key}`)
        console.log("******************************************************");
        const {weather , temp} = data.data[data.data.length -1];
        const {description} = weather;
        const weather_data = {description, temp}
        console.log(weather_data);
        console.log("******************************************************");
        return weather_data
        
    }else if (Rdays > 7){
        const {data} = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${la}&lon=${lo}&units=M&days=${Rdays}&key=${key}`)
        console.log("******************************************************");
        const {weather , temp, app_max_temp, app_min_temp} = data.data[data.data.length -1];
        const {description} = weather;
        const weather_data = {description, temp, app_max_temp, app_min_temp}
        console.log("******************************************************");
        return weather_data
    }
    // if(!data.geonames.length){
    //     const errMsg = {
    //         message: "no city with that name. please make sure of your spelling",
    //         error: true
    //     }
    //     return errMsg
    // }
}


module.exports = {
    weatherTemp
}