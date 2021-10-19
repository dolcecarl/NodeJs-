const express = require("express");
const https= require("https");
const app = express();
const bodyParser= require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){

    res.sendFile(__dirname + "/index.html");
    // res.end("Server 5000 est active et  pret!")
    })

    app.post("/",function(req,res){

        // console.log(req.body.cityName);

     const query=req.body.cityName;

    const apiKey="e2cb9d130b916a26abf072afbf65fc28";

    const unit ="metric"

    const url ="https://api.openweathermap.org/data/2.5/weather?q="+ query+"&appid="+ apiKey+"&units="+unit+"";

    https.get(url,function(response){

        console.log(response.statusCode);

        response.on("data",function(data){

            // console.log(data);

            const temperature = JSON.parse(data);

            const description = temperature.weather[0].description;
           
             const temp= temperature.main.temp;

            console.log(temperature);

            console.log(description);

             const iconImage =temperature.weather[0].icon;

             const imageUrl=(" http://openweathermap.org/img/wn/"+ iconImage+"@2x.png");

             res.write("<br><br><h1>La temperature a "+query+" est "+""+ temp+" "+"degres</h1>");
             res.write("<p>La description de la temperature a <strong> "+query+" </strong>est:<strong> "+""+ description+"</strong></p><br>");
             res.write("<img src="+imageUrl+">");
            
           res.send();
            // const personne={
            //     name:"Carl Dolce",
            //     adresse:"Laval"
            // }
            // console.log(JSON.stringify(personne));
        })
        

    })
        // console.log("post receive!");
    })
    



    





app.listen(5000,function(){

    console.log("Connection au server 5000 activé!")
})