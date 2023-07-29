const mongoose = require("mongoose");
mongoose
    .connect(
        "mongodb+srv://" + process.env.DB_USER_PASS + "@projet6cluster.1ewdt.mongodb.net/test",
        {
            //useFindAndModify: false, 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        }
    )
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log("Failed to connect to MongoDB" , err));