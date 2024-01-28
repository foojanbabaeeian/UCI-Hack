import axios from "axios";

const form = document.querySelector("form");

const cityInp = document.querySelector("#city");
const dateInp = document.querySelector("#flightDate");

const city_error = document.querySelector("#city_error");
const date_error = document.querySelector("#date_error");

const handleSubmit = async (e) => {
  e.preventDefault();

  //checking if the function is working fine
  console.log("I am working fine");

  // validate form on the front-end side which is utterly important before calling the apis for better performance
  if(!validate_inputs()){
    return;
  };

  //get the location first and make sure call is successful
  const Location = await getCityLoc();
  
  //failing call to location
  if (Location && Location.error) {
    console.log("error1")
    //handling the error coming from the server-side
    city_error.innerHTML = `<i class="bi bi-exclamation-circle-fill me-2"></i>${Location.message}`;
    city_error.style.display = "block";
    return

  } else if (Location && !Location.error) {
    console.log("error2")
    //extract longitude and latitude
    const { lng, lat, name } = await Location;

    //get the date of the flight
    const date = dateInp.value;

    //user didn't input the date
    if (!date) {
      console.log("error3")
      console.log("please enter the date");
      date_error.innerHTML = `<i class="bi bi-exclamation-circle-fill me-2"></i>Please enter the date`;
      date_error.style.display = "block";
      return;
    }


    if (lng && lat) {
      // get remaining days before the flight
      //i need to calcualte remaining days
      const remainingDays = getRdays(date);

      //get the weather data and consider sending the remaining days to know when
      //exactly should i get my data back.

      const weather = await getWeather(lng, lat, remainingDays);
      if(weather && weather.error) {
        date_error.innerHTML = `<i class="bi bi-exclamation-circle-fill me-2"></i>${weather.message}`;
        date_error.style.display = "block";
        return;
      }
      //get the picture of the place
      const pic = await getCityPic(name);
      updateUI(remainingDays, name, pic, weather);
    }
  }
};

const validate_inputs = () => {
  city_error.style.display = "none";
  date_error.style.display = "none";
  if(!cityInp.value){
    city_error.innerHTML = `<i class="bi bi-exclamation-circle-fill me-2"></i>You need to enter the city`;
    city_error.style.display = "block";
    return;
  }
  if(!dateInp.value){
    date_error.innerHTML = `<i class="bi bi-exclamation-circle-fill me-2"></i>Please enter the date`;
    date_error.style.display = "block";
    return;
  }
  if(getRdays(dateInp.value) < 0){
    date_error.innerHTML = `<i class="bi bi-exclamation-circle-fill me-2"></i>Date cannot be in the past`;
    date_error.style.display = "block";
    return;
  }
  city_error.style.display = "none";
  date_error.style.display = "none";

  return true
};
//const { data } = await axios.post("http://localhost:8000/getCity", form,
const getCityLoc = async () => {
  if (cityInp.value) {
    const { data } = await axios.post("http://localhost:8000/getCity", { city: cityInp.value }, {
      headers: {
        "Content-Type": "application/json",   
      },
    });
    return data;

  } else {
    city_error.innerHTML = `<i class="bi bi-exclamation-circle-fill me-2"></i> This field cannot be left empty`;
    city_error.style.display = "block";
  }

  // console.log("my city data",data)
};

const getWeather = async (lng, lat, remainingDays) => {
  const { data } = await axios.post("http://localhost:8000/getWeather", {
    lng,
    lat,
    remainingDays,
  });

  return data;
};

const getRdays = (date) => {
  // Set the start and end dates
  const startDate = new Date();
  const endDate = new Date(date);

  // Calculate the time difference in milliseconds
  const timeDiff = endDate.getTime() - startDate.getTime();

  // Convert the time difference to days
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  // Output the result
  return daysDiff;
};

//getting the city picture from pixabay
const getCityPic = async (city_name) => {
  const { data } = await axios.post("http://localhost:8000/getCityPic", {
    city_name,
  });
  const { image } = await data;
  return image;
};

const updateUI = (Rdays, city, pic, weather) => {
  document.querySelector("#Rdays").innerHTML = `
  Your trip starts in ${Rdays} days from now
  `;
  document.querySelector(".cityName").innerHTML = `Location: ${city}`;
  document.querySelector(".weather").innerHTML =
    Rdays > 7
      ? `Weather is: ${weather.description}`
      : `Weather is expected to be: ${weather.description}`;
  document.querySelector(".temp").innerHTML =
    Rdays > 7
      ? `Forecast: ${weather.temp}&degC`
      : `Temperature: ${weather.temp} &deg C`;
  document.querySelector(".max-temp").innerHTML =
    Rdays > 7 ? `Max-Temp: ${weather.app_max_temp}&degC` : "";
  document.querySelector(".min-temp").innerHTML =
    Rdays > 7 ? `Min-Temp: ${weather.app_min_temp}&degC` : "";
  document.querySelector(".cityPic").innerHTML = `
   <image 
   src="${pic}" 
   alt="an image that describes the city nature"
   >
   `;
  document.querySelector(".flight_data").style.display = "block";
};

export { handleSubmit };
