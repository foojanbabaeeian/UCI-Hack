// import axios from "axios"

const express = require("express")
const app = express();
const cors = require("cors");
const dotenv = require("dotenv")

//read the json files coming to you
app.use(express.json())
app.use(express.static('dist'))
// app.use(dotenv.config)

//require dotenv
dotenv.config()

//get the city function which get location from geoNames
const  {getCityLoc} = require("./getCityLoc")
const {weatherTemp} = require("./weatherTemp")
const {getCityPic} = require("./getCityPic")

//using cors
app.use(cors())

port = 8000

//I had to fix an issue with the env file that it doesn't want to get the integers in my username so i made
// a separate const for them
const userstring = process.env.USERNAME_new
const usernumber = process.env.USERNUMBER
const WEATHER_KEY = process.env.WEATHER_KEY
const pixabay_key = process.env.pixabay_key
const username = userstring.concat(usernumber)


app.get("/", (req, res) => {
  res.render("index.html")
})

app.post("/getCity", async (req,res) => {
    console.log("post received")
    const city = req.body.city;
    const Location= await getCityLoc(city, username)
    // console.log("my location: ",req.body.city)
    return res.send(Location)
   
})

app.post("/getWeather", async (req,res) => {
   const {lng, lat, remainingDays} = req.body
   const getWeather = await weatherTemp(lng, lat, remainingDays, WEATHER_KEY)
   return res.send(getWeather)
})

app.post("/getCityPic", async (req,res) => {
  // console.log(Location)
  const {city_name} = req.body
  const getPic = await getCityPic(city_name, pixabay_key)
  return res.send(getPic)
})


// Route to start the server
app.post("/start-server", (req, res) => {
  exec("npm run dev", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error starting server: ${error.message}`);
      res.status(500).send("Error starting server.");
      return;
    }

    console.log(`Server started: ${stdout}`);
    res.status(200).send("Server started.");
  });
});

// Route to run the build process
app.post("/run-build", (req, res) => {
  exec("npm run build", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error running build: ${error.message}`);
      res.status(500).send("Error running build.");
      return;
    }

    console.log(`Build completed: ${stdout}`);
    res.status(200).send("Build completed.");
  });
});


app.listen(8000, () => console.log(`whaoooa: server is listening on port ${port}`))
