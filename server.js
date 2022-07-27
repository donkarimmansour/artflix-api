const express = require("express")
const app = express()
const morgan = require("morgan")
const passport = require("passport")
const DB = require("./database/db")
const cors = require("cors");
const { Host } = require("./common/apiEndpoints")

//env file
require("dotenv").config()

//database initialize
DB();

//development
if (app.get("env") == "development") {
    app.use(morgan("dev"))
}

const corsOptions = {
   origin : `${Host.FRONTEND}`
}  
 
//const  path  = require("path") 
//const  fs  = require("fs")


// app.get("/images/*" , (req , res) => {
//     fs.readFile(`public/images/b.png`, function(err, data) {
//         if (err) res.status(401).json({"error": "yes", "message": "There was an error fetching your image"}) ;
//         else {
//           res.writeHead(200, {'Content-Type': 'image/jpeg'});
//           res.end(data); 
//         }
//       });
// });

// console.log(path.join(__dirname ,'public' , 'images'));


//decoded data
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use( cors() );


//passport initialize
require("./config/passport")
app.use(passport.initialize());

module.exports = {app }
