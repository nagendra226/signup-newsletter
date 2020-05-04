//jshint esversion:6

const express = require("express");
const app = express();

const bodyParser = require('body-parser');

const https = require("https");

const requests = require("requests");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"))

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/signup.html');

});

app.post("/", function (req, res) {
    let firstName = req.body.inputFirstName;
    let lastName = req.body.inputLastName;
    let email = req.body.inputEmail;

    let data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us8.api.mailchimp.com/3.0/lists/fdf4d5c297"

    const options = {
        method: "POST",
        auth: "NagendraBabu:590bec22d5cf220f2e44feb6bc544dbe-us8"
    }

    const request = https.request(url, options, function (response) {

        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data", function (data) {
            //console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();

   

});

//API Key for Mail Chimp
//590bec22d5cf220f2e44feb6bc544dbe-us8

//unique id
//fdf4d5c297

app.post("/failure", function (req, res) {
    res.redirect("/");
}
);


app.listen("3000", function () {
    console.log("Server started at the port 3000");
});