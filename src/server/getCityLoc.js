// import axios from "axios"

const axios = require("axios")

console.log("WENT HERE, getCityLoc.js")

const getCityLoc = async(city, username) => {
    
    // const {data} = await axios.get(`https://secure.geonames.org/searchJSON?q=${city}&maxRows=1&username=${username}`)
    const {data} = await axios.get(`https://secure.geonames.org/searchJSON?q=${city}&maxRows=1&username=${username}`)
    // console.log("SHITT: my data: ", data)
    if(!data.geonames.length){
        const errMsg = {
            message: "No city with that name. Please make sure of your spelling",
            error: true
        }
        return errMsg
    }
    
    return data.geonames[0]
}

module.exports =  {getCityLoc}