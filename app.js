// jquery read function
$(document).ready(function() {    
    // API key stored in a variable for easier access
    const APIKey = "84e00228b4110f0bb695057ef871a2b0";
    // create function that begins on click
    $("#search").on("click", function () {
        // set variables for easier ability to create values
        let city = $("#cityChoice").val();
        // if possible, add country and zip code!
        // let country =$("#countryChoice").val();
        // let zip =$("#zip").val();
        // the URL stored in a variable for easier access
        var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country},${zip}&appid=${APIkey}`
    // Do an ajax request using the URL variable
    $.ajax({
        url: queryURL,
        method: "GET"
    })// Store all of the retrieved data inside of an object called "response"
        .then(function(response) {
        // Log the resulting object
        console.log(response);
        // create several variables which will need to be called
        // city
        var city = response.name;
        // current weather conditions
        // city name,the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
        // UV index - states severity of the UV Index by color warning
        // 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
        var wind = response.wind.speed;
        var humidity = response.main.humidity;
        var temp = (parseInt(response.main.temp) - 273.15) * 1.80 + 32;
        // Transfer content to HTML
        $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".humidity").text("Humidity: " + response.main.humidity);
        // Convert the temp to fahrenheit
        // var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        // add temp content to html
        $(".temp").text("Temperature (K) " + response.main.temp);
        $(".tempF").text("Temperature (F) " + tempF.toFixed(2));
        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + response.main.temp);
        }); 
        
        // search history
        // current and future conditions for that city
        // open the weather dashboard
        // THEN I am presented with the last searched city forecast


        // Example from Artist
        // // Add code to query the bands in town api searching for the artist received as an argument to this function
        // var appKey = "84e00228b4110f0bb695057ef871a2b0";
        // const $artistDiv = $('#artist-div');

        // $.ajax({
        // url: "https://rest.bandsintown.com/artists/" + artist + "?app_id=" + appKey,
        // method: "GET"
        // }).then(function(response){
        // console.log(response);
        // $artistDiv.append(response.name);
        // $artistDiv.append($('<img>').attr("src", response.image_url));
        // $artistDiv.append($('<h1>').append("Number of fans tracking the " + artist + " " + response.tracker_count));
        // $artistDiv.append($('<h1>').append("Number of upcoming events =" + " " + response.upcoming_event_count));
        // $artistDiv.append($('<a>').attr("href", response.url).append(artist));
        // });       
});