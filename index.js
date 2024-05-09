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

// HERE*********************************
app.get("/api/:date?", (req, res) => {
  //params gets the URL value
  const urlValue = req.params.date;
  
  let qa = /^[a-z]/

  const analyzeUrlDate = (dt) => {


    if(dt == null){
      const currentTimeUnix = new Date().getTime()
      const currentTimeUTC = new Date().toUTCString()
      return res.json({
        "unix": currentTimeUnix,
        "utc": currentTimeUTC
      })
    }
    if(qa.test(dt) == true){
      return res.json({error : "Invalid Date"})
    }
    if(/^[1]/.test(dt) !== true){
      let stringDate = urlValue.toString()
      const unixDate = new Date(stringDate).getTime()
      const utcDate = new Date(stringDate).toUTCString()
      return res.json({"unix": unixDate,"utc": utcDate})
    }else{
      const unixDate = new Date(parseInt(urlValue)).getTime()
      const utcDate = new Date(parseInt(urlValue)).toUTCString()
      return res.json({"unix": unixDate,"utc": utcDate})
    }
  }




  res.send(analyzeUrlDate(urlValue))
})
// HERE*********************************

// app.get("/api/:date?", (req, res)=>{
//   req.date = {
//     "unix": new Date().getTime(),
//     "utc": new Date().toUTCString()
//   };
//   res.send(req.date)
// }
// )



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});







