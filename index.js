// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// MY CODE STARTS HERE*********************************
app.get("/api/:date?", (req, res) => {
  //params gets the URL value
  const urlValue = req.params.date;
  
  let qa = /^[a-z]/

  const analyzeUrlDate = (dt) => {
    // Check if the params is null, if so, return unix and utc time json
    if(dt == null){
      const currentTimeUnix = new Date().getTime()
      const currentTimeUTC = new Date().toUTCString()
      return res.json({
        "unix": currentTimeUnix,
        "utc": currentTimeUTC
      })
    }
    // Check if the params is starts with a letter (see 'qa'), if ture, it will be invalid date, return invalid date
    if(qa.test(dt) == true){
      return res.json({error : "Invalid Date"})
    }
    //Check if date DOES NOT START with a '1', if so it means date format is in 2015-04-12.
    if(/^[1]/.test(dt) !== true){
      let stringDate = urlValue.toString()//Need to convert this date format to a string
      const unixDate = new Date(stringDate).getTime()// pas it through the Date() to get time
      const utcDate = new Date(stringDate).toUTCString()// pass it through the Date() to get utc
      return res.json({"unix": unixDate,"utc": utcDate})// return Jason
    }
    // if date is set in unix ex. 1451001600000, parse and pass it through the Date()
    else{
      const unixDate = new Date(parseInt(urlValue)).getTime()
      const utcDate = new Date(parseInt(urlValue)).toUTCString()
      return res.json({"unix": unixDate,"utc": utcDate})// return json
    }
  }

  res.send(analyzeUrlDate(urlValue))
})

// MY CODE ENDS HERE*********************************


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});







