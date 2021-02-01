const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

let corsOption = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const db = require("./models");
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to database!");
}).catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});

app.get("/", (req, res) => {
    res.json({
        code: 0,
        message: "Hello World!",
        data: {}
    });
});

require("./routes/tutorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});