require('express-async-errors');
const express = require("express");
const route = require("./routes/route.js");
const mongoose = require("mongoose");
const { errorHandler } = require("./Middleware/errors.js");

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://Mahesh8985:lz9fOW52615YVat4@cluster0.l5fafvk.mongodb.net/Group43Database")
    .then(() => console.log("MongoDb is connected"))
    .catch((err) => console.log(err));

app.use("/", route);
app.use(errorHandler);

app.listen(process.env.PORT || 3000, function () {
    console.log("Express app running on port " + (process.env.PORT || 3000));
});
