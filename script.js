function start() {
    var searchTerm = document.getElementById("searchBox").value;
    var url = `https://restcountries.com/v3.1/name/${searchTerm}`;
  
    fetch(url)
      .then(res => res.json())
      .then(data => process(data))
      
  }
  
function process(data) {
    var displayArea = document.getElementById("displayContent");
    displayArea.textContent = "";
  
    for (var i = 0; i < data.length; i++) {
      var newDiv = document.createElement("div");
      newDiv.classList.add("innerStyle");
  
      var countryName = data[i].name.common;
      var capital = data[i].capital;
      var flag = data[i].flags.png;
      var population = data[i].population;
      var region = data[i].region;
  
      newDiv.innerHTML = `
        <h3>${countryName}</h3>
        <p><strong>Capital:</strong> ${capital}</p>
        <img src="${flag}" alt="Flag">
        <p><strong>Population:</strong> ${population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${region}</p>
        <button onclick="getWeather('${capital}', this)">More Details</button>
        <div class="weatherInfo"></div>
      `;
  
      displayArea.appendChild(newDiv);
    }
  }
  
function getWeather(capital, button) {
    var apiKey = 'a28385f084ddf987a05762000254c61d'; 
    var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`;
  
    fetch(weatherUrl)
      .then(res => res.json())
      .then(data => {
        var weatherDiv = button.nextElementSibling;
        weatherDiv.innerHTML = `
          <p><b>Temperature : </b>${data.main.temp}°C</p>
          <p><b>Weather : </b>${data.weather[0].description}</p>
        `;
      })
      
}
  