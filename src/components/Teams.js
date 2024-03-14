import axios from 'axios'

export async function axiosTeams() {
    try {
        const response = await axios.get('https://localhost:7299/api/Teams');
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

export async function Teams() {
    try {
        const response = await fetch('https://localhost:7299/api/Teams');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

