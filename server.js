require('newrelic');
const express = require("express");
var proxy = require('http-proxy-middleware');
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const port = 3000;

app.use(cors());
// app.use(express.static(path.join(__dirname, "/public"))); // commented out since we don't really need to serve anything up right now
// cus then that will start making its own requests, so im having this directly make the requests to each microservices
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Proxy listening on port ${port}`);
});


// change this so that it serves the static page
// which runs the script files, which grabs the bundle files
// then have this listen to the requests the bundles will make
// and redirect those requests to the appropriate endpoint--- which in this case would be its local hosts
// i guess the purpose of this is to test the speeds if the item needs to go through two servers

// by pass the client, the artillery will act as the client so this just needs to be setup to redirect the call
// so it makes it to local host instead of its own origin. so index.html doesn't really matter

// now i will have artillery call this end point to see how it does
// http://localhost:3000/popular_dish

// app.route('/popular_dish')
//   .get(function(req,res) {
//     // maybe make this adatable to :params as well
//     console.log('ABOUT TO REDIRECT')
//     res.redirect('http://localhost:3002/carousel ')
//   })
//   .post()

// using proxy middleware
  app.use(
    '/popular_dish',
    proxy({ target: 'http://localhost:3002/carousel', changeOrigin: true })
  );