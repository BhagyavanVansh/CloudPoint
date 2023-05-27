const inputBox = document.querySelector('.input__box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather__img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind__speed');
const location_not_found = document.querySelector('.location-not-found');
const heading = document.querySelector('.heading');
const weather_body = document.querySelector('.weather__body');
const top_layer = document.querySelector('.top_layer');
const time = document.querySelector('.time');

const getCurrentTime = () => {
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    let weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let currentTime = new Date();
    let month = months[currentTime.getMonth()];
    let day = weekday[currentTime.getDay()];
    let date = currentTime.getDate();
    

    return `<p id="day">${day}</p>
    <p id="today_data">${date} ${month}</p>`;
  };

top_layer.innerHTML = getCurrentTime();

const setTime = () => {
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();

    const timePeriod = hours >= 12 ? 'PM' : 'AM';

  
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

    function addLeadingZero(value) {
        return value < 10 ? '0' + value : value;
      }

    const formattedTime = `${formattedHours}:${addLeadingZero(minutes)}:${addLeadingZero(seconds)} ${timePeriod}`;
    time.textContent = formattedTime;
}

setInterval(setTime, 1000);


async function cheakWeather(city){
    const api_key = 'd31e9a71fe00fe8e28533cc38ff1ec38';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());

    if(weather_data.cod === '404'){
        if(city.trim() === ''){
            heading.innerHTML = 'Please enter location!!'
        }
        weather_body.style.display='none';
        location_not_found.style.display = 'flex';

        return;
    }

    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}<sup>°C</sup>`;
    description.innerHTML = `${weather_data.weather[0].description}`; 
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;


    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src = './images/cloud.png';
            break;
        case 'Clear':
            weather_img.src = './images/clear.png';
            break;
        case 'Rain':
            weather_img.src = './images/rain.png';
            break;
        case 'Snow':
            weather_img.src = './images/snow.png';
           break;
        case 'Mist':
            weather_img.src = './images/mist.png';
           break;
    }
    location_not_found.style.display = 'none';
    weather_body.style.display='flex';
}

searchBtn.addEventListener('click', () => {
    cheakWeather(inputBox.value);
})