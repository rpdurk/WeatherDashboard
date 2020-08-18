$(document).ready(function () {
    // hide the forecast
    $(".forecast").hide();
    // place to store Locations for local storage
    var locations = [];
    // function to begin local storage
    init();
    // turns local storage into buttons
    function renderSearchedCities() {
        if (locations.length > 4) {
            locations.shift();
        }
        for (var i = 0; i < locations.length; i++) {
            let $searchedCityBtn = $("<btn>");
            $searchedCityBtn.attr("type", "button").attr("data-city", [i]).addClass("btn btn-info locationHistory").text(locations[i]);
            $(".btnSearchHistory").append($searchedCityBtn);
        }
    }
    // Checks Local Storage
    function init() {
        let storedLocations = JSON.parse(localStorage.getItem("locations"));
        if (storedLocations !== null) {
            locations = storedLocations;
        }
        renderSearchedCities();
    };

    // API key stored in a variable for easier access
    const APIKey = "84e00228b4110f0bb695057ef871a2b0";
    // create function that begins on click
    $(".search").on("submit", function (event) {
        event.preventDefault()
        // set variables for easier ability to create values
        var cityName = $("#city").val();

        // adds search history to buttons
        let locationsHistory = $("#city").val();
        if (locationsHistory === "") {
            return;
        };
        locations.push(locationsHistory);
        localStorage.setItem("locations", JSON.stringify(locations));
        //*************************************** */ if possible, add country and zip code!
        // let country =$("#countryChoice").val();
        // let zip =$("#zip").val();

        // the URL stored in a variable for easier access
        var queryURLWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`
        // Do an ajax request using the URL variable
        $.ajax({
            url: queryURLWeather,
            method: "GET"
            // Store all of the retrieved data inside of an object called "response"
        }).then(function (response) {
            // create several variables which will need to be called
            // city response
            var cityName = response.name;
            // todays date
            // var todaysDate = moment().format("MMM Do YY").val();
            // temp in F.
            var temp = (parseInt(response.main.temp) - 273.15) * 1.80 + 32;
            // humidity
            var humidity = response.main.humidity;
            // wind speed
            var wind = response.wind.speed;
            const lon = response.coord.lon;
            const lat = response.coord.lat;
            var uvIndexValue = uvIndexFunction(lat, lon);
            console.log(uvIndexValue);
            // UV index - states severity of the UV Index by color warning

            // Transfer content to dynamically
            let $searchCityDiv = $("<div>")//$("#searchCityDiv");
            $searchCityDiv.addClass("container-fluid text-center").attr("id", "searchCityDiv");
            let $card = $("<div>");
            $card.addClass("card card-cascade wider reverse my-4 pb-5 weatherFacts");
            let $cardBody = $("<div>");
            $cardBody.addClass("card-body card-body-cascade text-center wow fadeIn cityWeather").attr("data-wow-delay", "0.2s");
            let $cityName = $("<h3>");
            $cityName.addClass("card-title cityName").text(`City: ${cityName}`);
            // let $todaysDate = $("<h5>");
            // $todaysDate.addClass("card-title date").text(` ${todaysDate}`);
            let $temp = $("<p>");
            $temp.addClass("card-text temp").text(`Temperature: ${temp.toFixed(2)} F`);
            let $humidity = $("<p>");
            $humidity.addClass("card-text humidity").text(`Humidity: ${humidity}%`);
            let $wind = $("<p>");
            $wind.addClass("card-text wind").text(`Wind Speed: ${wind} m/h`);
            // let $uvIndex = $("<p>");
            // $uvIndex.addClass("card-text uvIndex"); 
            // $uvIndex.addClass("card-text uvIndex").text(`UV Index ${uvIndexValue}`); ***********original Line*****
            $card.append($cityName, /*$todaysDate, */ $temp, $humidity, $wind, /*$uvIndex*/);
            $cardBody.append($card);
            $searchCityDiv.append($cardBody);
            $('.cityContainer').append($searchCityDiv);
            // console.log("City: " + city);
            // console.log("Wind Speed: " + wind);
            // console.log("Humidity: " + humidity);
            // console.log("Temperature (F): " + temp);
            // console.log(lon);
            // console.log(lat);
            // Attempt to have local storage
        });
    });

    function uvIndexFunction(lat, lon) {
        // event.preventDefault()
        var queryURLData = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exlclude={part}&appid=${APIKey}`
        $.ajax({
            url: queryURLData,
            method: "GET"
        }).then(function (data) {
            let uvIndex = data.current.uvi;
            // console.log("UV: " + uvIndex);
            let $uvIndex = $("<p>");
            $uvIndex.addClass("card-text uvIndex");
            $(".weatherFacts").append($uvIndex);
            // UV index - states severity of the UV Index by color warning
            if (uvIndex > 0.01 & uvIndex < 3) {
                //color turn green 
                $uvIndex.addClass('success-color').text(`UV Index: Low Danger  + ${uvIndex}`);
            } else if (uvIndex > 3 & uvIndex < 6) {
                // color turns yellow 
                $uvIndex.addClass('yellow accent-1').text(`UV Index: Moderate to High Danger  ${uvIndex}`);
            } else if (uvIndex > 6 & uvIndex < 8) {
                // color turns orange 
                $uvIndex.addClass('warning-color').text(`UV Index: Moderate to High Danger  ${uvIndex}`);
            } else if (uvIndex > 8 & uvIndex < 11) {
                // color turns red 
                $uvIndex.addClass('danger-color').text(`UV Index: Very High to Extreme Danger  ${uvIndex}`);
            } else if (uvIndex > 11) {
                // color turns purple 
                $uvIndex.addClass('secondary-color').text(`UV Index: Very High to Extreme Danger  ${uvIndex}`);
            }
            return uvIndex;
        });
    }

    // 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
    $(".search").on("submit", function (event) {
        event.preventDefault();
        $(".5DayForecast").empty();
        $(".cityContainer").empty();
        var cityName = $("#city").val();
        var queryURLForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}`
        $.ajax({
            url: queryURLForecast,
            method: "GET"
        }).then(function (forecast) {
            // console.log(forecast);
            let forecastIndex = 0;
            // Create a for loop to dynamically render all 5 days
            for (i = 0; i < 5; i++) {
                // current weather conditions via icon*************************************************************************
                let forecastWeatherIcon = forecast.list[forecastIndex].weather[forecastIndex].icon;
                let forecastIconDescription = forecast.list[forecastIndex].weather[forecastIndex].description;
                let forecastWeatherURL = `http://openweathermap.org/img/wn/${forecastWeatherIcon}@2x.png`
                let forecastDate = forecast.list[forecastIndex].dt_txt;
                let forecastTemp = (parseInt(forecast.list[forecastIndex].main.temp) - 273.15) * 1.80 + 32;
                let forecastHumidity = forecast.list[forecastIndex].main.humidity;

                // console.log(forecast.list[forecastIndex].weather.icon);
                // console.log(forecastWeatherURL);
                // console.log(forecastIconDescription);

                //  need to be added each time! 
                let $forecastCol = $("<div>");
                $forecastCol.addClass("col");
                let $forecastCard = $("<div>");
                $forecastCard.addClass("card card-cascade wider reverse my-4");
                let $forecastCardBody = $("<div>");
                $forecastCardBody.addClass("card-body card-body-cascade text-center wow fadeIn primary-color");
                let $forecastDate = $("<h4>");
                $forecastDate.addClass("card-title text-white").text(forecastDate);
                let $forecastWeatherIconLink = $('<span>');
                $forecastWeatherIconLink.append($('<img>').attr('src', forecastWeatherURL));
                let $forecastIconDescription = $("<p>");
                $forecastIconDescription.addClass("card-text text-white").text(`${forecastIconDescription}`);
                let $forecastTemp = $("<p>");
                $forecastTemp.addClass("card-text text-white").text(`Temperature: ${forecastTemp.toFixed(2)} F`);
                let $forecastHumidity = $("<p>");
                $forecastHumidity.addClass("card-text text-white").text(`Humidity: ${forecastHumidity}%`);
                $forecastDate.append($forecastIconDescription, $forecastWeatherIconLink, $forecastTemp, $forecastHumidity);
                $forecastCardBody.append($forecastDate);
                $forecastCard.append($forecastCardBody);
                $forecastCol.append($forecastCard);
                $(".5DayForecast").append($forecastCol);
                $(".forecast").show();
            }
        });
    });
});