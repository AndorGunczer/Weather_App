// Modifications to the DOM

const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time_img = document.querySelector('img.time');
const icon_img = document.querySelector('.icon img');
const forecast = new Forecast();

// update details template

const updateUI = data => {

    const cityDets = data.cityDets;
    const weather = data.weather;

    card.classList.remove('d-none');
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;
    console.log(weather, cityDets);
    // update the night/day & icon images

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    let timeSrc = null;
    if (weather.IsDayTime)
        timeSrc = 'img/day.svg';
    else
        timeSrc = 'img/night.svg';
    time_img.setAttribute('src', timeSrc);
    icon_img.setAttribute('src', iconSrc);
};

// const updateCity = async (city) => { // async because we call async function within it
//     const cityDets = await getCity(city);
//     const weather = await getWeather(cityDets.Key);

//     // when var_name = val_name you can just send one cityDets instead of cityDets = cityDets
//     return { cityDets, weather };
// };

cityForm.addEventListener('submit', event => {
    event.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update the ui with new city
    forecast.updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

    // set local storage
    localStorage.setItem('city', city);
});

const cityBuff = localStorage.getItem('city');

if (cityBuff !== null){
    forecast.updateCity(cityBuff)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}