const mongoose= require("mongoose");
const mongoURI=  "mongodb://localhost:27017/INOTEBOOK?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const  connectToMongo= ()=>{
    mongoose.connect(mongoURI,()=>{
            console.log("connected to db");
    });
}

module.exports = connectToMongo