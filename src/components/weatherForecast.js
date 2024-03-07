import axios from 'axios'

export async function axiosWeatherForecast() {
    try {
        const response = await axios.get('http://localhost:5165/WeatherForecast');
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

export async function weatherForecast() {
    try {
        const response = await fetch('http://localhost:5165/WeatherForecast');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

