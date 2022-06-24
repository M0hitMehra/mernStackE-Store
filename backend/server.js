const app = require('./app')
const connectDatabase = require('./config/dataBase')
const cloudinary = require('cloudinary')

process.on('uncaughtException', (err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting Down Server due to UnCaught exception`);
    process.exit(1);
})

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
  }

//connectDatabase connectin database
connectDatabase()



cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

app.listen(process.env.PORT , ()=>{
    console.log(`listening on port http://localhost/${process.env.PORT}`);
})

process.on("unhandledRejection" , (err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting Down Server due to Unhandled Promise Rejection`);
    process.exit(1);
});