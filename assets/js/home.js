require('dotenv').config();

const weatherKey = process.env.apiKeyWeather;
const btoPesquisarClima = document.querySelector("#btoPesquisarClima");
const lblCidade = document.querySelector("#lblCidade");
const vento = document.querySelector("#vento");
const umidade = document.querySelector("#umidade");
const lblTemperatura = document.querySelector("#lblTemperatura");
const descricao = document.querySelector("#descricao");
const imgUmidade = document.getElementById("#imgUmidade");

function page_Load () {
    showWeatherDataLocal();
};


const getWeatherData = async(city) => {
    const urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherKey}&lang=pt_br`;

    const resp = await fetch(urlWeather);
    const data = await resp.json();

    return data;
};

const showWeatherData = async(city) => {
    const data = await getWeatherData(city);

    lblCidade.innerText = data.name;
    vento.innerText = data.wind.speed;   
    umidade.innerText = data.main.humidity + "%";
    umidade.innerHTML = `<i class="fa-solid fa-droplet"/>`;
    lblTemperatura.innerText = data.main.temp + "°C";
    descricao.innerText = data.weather[0].description;
};

btoPesquisarClima.addEventListener("click", (e) => {
    e.preventDefault();
    
    const city = inputCidade.value;

    showWeatherData(city);
});

const showWeatherDataLocal = async () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async function(position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherKey}&lang=pt_br`;
    
        const resp = await fetch(urlWeather);
        const data = await resp.json();

        lblCidade.innerText = data.name;
        vento.innerText = data.wind.speed;   
        umidade.innerText = data.main.humidity + "%";
        lblTemperatura.innerText = data.main.temp + "°C";
        descricao.innerText = data.weather[0].description;
        }, function(error) {
        alert("Erro ao obter a posição: " + error.message);
        });
    } else {
        alert("Geolocalização não suportada pelo navegador");
    }
};