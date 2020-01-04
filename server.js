const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const port = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, "/public")));
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

// by pass the client, the artillery will act as the client