
class Forecast {
    constructor(){
        this.key = '5AqMR1LYwvVi5h4farupgUtwESctl39y';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    }

    async updateCity(city) {
        const cityDets = await this.getCity(city);
        const weather = await this.getWeather(cityDets.Key);

        // when var_name = val_name you can just send one cityDets instead of cityDets = cityDets
        return { cityDets, weather };
    }

    async getCity(city) {
        const query = `?apikey=${this.key}&q=${city}` // ? means query parameters & next query param
    
        const response = await fetch(this.cityURI + query);
        const data = await response.json();
    
        return data[0];
    }

    async getWeather(id) {
        const query = `${id}?apikey=${this.key}`;
    
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
    
        // console.log(data);
        return data[0];
    }
}

// getCity('heilbronn').then(data => { 
//     return getWeather(data.Key);
// }).then(data => {
//     console.log(data);
// }).catch(err => console.log(err));