//following from express boilerplatenpm install ejs --save
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const request = require('request');

app.locals.weather ='';
app.locals.error = '';

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));  //use our css sheet
app.set('view engine', 'ejs')   //use ejs to simplify html

app.get('/', function (req, res) {
  res.render('index')
})

//similar format to get request, process input
app.post('/', function (req, res){
    let apiKey = 'd2f15cbd2b32bba3eaba24913023cd5b';  //api key generated from openweather
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
  request(url, function (err, response, body) {
      if(err){
        res.render('index', {weather: null, error: 'Please use valid location'});
      } else {
        let weather = JSON.parse(body)
        if(weather.main == undefined){
          res.render('index', {weather: null, error: 'Please use valid location'});
        } else {
            if(weather.main.temp > 85){
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}. Bring some shades! ` + String.fromCodePoint(0x1F31E) + String.fromCodePoint(0x1F60E); 
                res.render('index', {weather: weatherText, error: null});
                console.log(weatherText);
                
                //change background to warmer color - implement
            }
            if(weather.main.temp < 60){
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}. Bring a jacket! ` + String.fromCodePoint(0x2744);
                res.render('index', {weather: weatherText, error: null});
                console.log(weatherText);

                //change background to colder color - implement
            }
            else{
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}. Enjoy the weather! ` + String.fromCodePoint(0x26C5);
                res.render('index', {weather: weatherText, error: null});
                console.log(weatherText);

                //keep background at default color
                /*
                var color = $("#8942a8").val();
                var color2 = $("#ba382f").val();
                var str = "linear-gradient(to left" + color + "," + color2 + ")";
                $("body").css("background",str);
                */
            }
        }
      }
    });
})


//use port 3000 to listen
app.listen(3000, function () {
  console.log('Launched temperature app using localhost:3000')
})