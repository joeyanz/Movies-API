const app = require("./app");
const mongoose = require("mongoose");

// setup the port
const port = process.env.PORT || 3000;

// setup the server and the database
const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log("Server listening on port " + port);
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

// start the server
start();
