$(document).ready(function() {    
    // API key stored in a variable for easier access
    // $(".weather").hide();
    const APIKey = "84e00228b4110f0bb695057ef871a2b0";
    // create function that begins on click
    let lat;
    let lon;
    $(".search").on("submit", function (event) {
        event.preventDefault()
        // set variables for easier ability to create values
        // $(".forecast").show();
        var city = $("#city").val();
            //*************************************** */ if possible, add country and zip code!
        // let country =$("#countryChoice").val();
        // let zip =$("#zip").val();
        // the URL stored in a variable for easier access
        var queryURLWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`
        // Do an ajax request using the URL variable
        $.ajax({
            url: queryURLWeather,
            method: "GET"
            // Store all of the retrieved data inside of an object called "response"
        }).then (function(response) {
            // create several variables which will need to be called
                // city response
                var city = response.name;
                // todays date
                // var todaysDate = moment().format("MMM Do YY").val();
                // current weather conditions via icon*************************************************************************
                var weatherIcon = response.weather.icon;
                // temp in F.
                var temp = (parseInt(response.main.temp) - 273.15) * 1.80 + 32;
                // humidity
                var humidity = response.main.humidity;
                // wind speed
                var wind = response.wind.speed;
                uvIndexFunction();
                let lon = response.coord.lon;
                let lat = response.coord.lat;
                // var UV index
                // var uvIndex = response.
            // UV index - states severity of the UV Index by color warning
            
            // Transfer content to dynamically
                let $searchCityDiv = $("<div>")//$("#searchCityDiv");
                $searchCityDiv.addClass("container-fluid text-center").attr("id", "searchCityDiv");
                let $card = $("<div>");
                $card.addClass("card card-cascade wider reverse my-4 pb-5");
                let $cardBody = $("<div>");
                $cardBody.addClass("card-body card-body-cascade text-center wow fadeIn cityWeather").attr("data-wow-delay", "0.2s");
                let $cityName = $("<h3>");
                $cityName.addClass("card-title cityName").text(`City: ${city}`);
                // let $todaysDate = $("<h5>");
                // $todaysDate.addClass("card-title date").text(` ${todaysDate}`);
                let $temp = $("<p>");
                $temp.addClass("card-text temp").text(`Temperature: ${temp.toFixed(2)} F`);
                let $humidity = $("<p>");
                $humidity.addClass("card-text humidity").text(`Humidity: ${humidity}%`);
                let $wind = $("<p>");
                $wind.addClass("card-text wind").text(`Wind Speed: ${wind} m/h`);
                let $uvIndex = $("<p>");
                $uvIndex.addClass("card-title uvIndex").text(`UV Index ${uvIndex}`);
                $card.append($cityName, /*$todaysDate, */ $temp, $humidity, $wind, $uvIndex);
                $cardBody.append($card);
                $searchCityDiv.append($cardBody);
                $('.cityContainer').append($searchCityDiv);
                    // console.log("City: " + city);
                    // console.log("Wind Speed: " + wind);
                    // console.log("Humidity: " + humidity);
                    // console.log("Temperature (F): " + temp);
                    console.log(lon);
                    console.log(lat);
                
        });
    });     

    function uvIndexFunction() {
        // event.preventDefault()
        let lon;
        let lat;
        var queryURLData = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exlclude={part}&appid=${APIKey}`
        $.ajax({
            url: queryURLData,
            method: "GET"
        }).then (function(data) {
            let uvIndex = data.current.uvi;
            // let $uvIndex = $("<p>");
            // $uvIndex.addClass("card-title uvIndex").text(`UV Index ${uvIndex}`);
            // $card.append($uvIndex);
            // $cardBody.append($card);
            // $searchCityDiv.append($cardBody);
            // $('.cityContainer').append($searchCityDiv);
            console.log("UV: " + UVIndex);
            // UV index - states severity of the UV Index by color warning
        });
    }   


    // 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
    $(".search").on("submit", function (event) {

        event.preventDefault()
        var city = $("#city").val();
        var queryURLForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`
        $.ajax({
            url: queryURLForecast,
            method: "GET"
        }).then (function(forecast) {
            console.log(forecast);
            let forecastIndex = 0;
            // Create a for loop to dynamically render all 5 days
            for (i = 0; i < 5; i++) {
                // current weather conditions via icon*************************************************************************
                // let ForecastWeatherIcon = forecast.list[forecastIndex].weather.icon;
                let forecastDate = forecast.list[forecastIndex].dt_txt;
                let forecastTemp = (parseInt(forecast.list[forecastIndex].main.temp) - 273.15) * 1.80 + 32;
                let forecastHumidity = forecast.list[forecastIndex].main.humidity;
                // console.log(forecast.list[forecastIndex].weather.icon);
            // these lines only need to happen once!
                // let $forecastDiv = $("<div>");
                // $forecastDiv.addClass("container-fluid text-center weather forecast");
                // let $forecastTitle = $("<h3>");
                // $forecastTitle.addClass("card-title fiveDayForecast text-center forecast").text("Five Day Forecast:");
                // let $forecastRow = $("<div>");
                // $forecastRow.addClass("row");
            //  need to be added each time! 
                let $forecastCol = $("<div>");
                $forecastCol.addClass("col");
                let $forecastCard = $("<div>");
                $forecastCard.addClass("card card-cascade wider reverse my-4 pb-5");
                let $forecastCardBody = $("<div>");
                $forecastCardBody.addClass("card-body card-body-cascade text-center wow fadeIn");
                let $forecastDate = $("<h4>");
                $forecastDate.addClass("card-title").text(forecastDate);
                let $forecastTemp = $("<p>");
                $forecastTemp.addClass("card-text").text(`Temperature: ${forecastTemp.toFixed(2)} F`);
                let $forecastHumidity = $("<p>");
                $forecastHumidity.addClass("card-text").text(`Humidity: ${forecastHumidity}%`);
                $forecastDate.append($forecastTemp, /*$forecastIcon, */ $forecastHumidity);
                $forecastCardBody.append($forecastDate);
                $forecastCard.append($forecastCardBody);
                $forecastCol.append($forecastCard);
                $(".5DayForecast").append($forecastCol);
            }
        });
    });    
});