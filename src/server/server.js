const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const path = require('path');

const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream')
const methodOverride = require('method-override');


const users = require("./routes/api/users");
const managers = require("./routes/api/managers");
const supervisors = require("./routes/api/supervisors");
const customers = require("./routes/api/customers");
const drivers = require("./routes/api/drivers");
const boys = require("./routes/api/boys");
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());
app.use(methodOverride('_method'))

const CONNECTION_URL = require("./config/keys").mongoURL;
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));


mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("connected to mongodb"))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/managers", managers);
app.use("/api/supervisors", supervisors);
app.use("/api/customers", customers);
app.use("/api/drivers",drivers)
app.use("/api/boys",boys)
