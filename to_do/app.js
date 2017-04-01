var express = require("express"); //Http  server but framework  node js i will create http server (web services,REST API)
var app = express();
var port = 8081;
var bodyParser = require("body-parser");
var validator = require('express-validator');
// var regex = require("regex");
// var check_email = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
// var check_password = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z]*[A-Z])(?=.*[@#$%&_]).*$/;
// var check_phone_no = /^([7-9]{1}[0-9]{9})$/;

var firebase = require("firebase").initializeApp({
    apiKey: "AIzaSyBew-jpTAbfAAi-dErmOLUZOHoRKHwEBjk",
    authDomain: "todo-ea1d9.firebaseapp.com",
    databaseURL: "https://todo-ea1d9.firebaseio.com",
    projectId: "todo-ea1d9",
    storageBucket: "todo-ea1d9.appspot.com",
    messagingSenderId: "1014338953996"
});

var ref = firebase.database().ref();

app.use(bodyParser.json())
app.use(validator());

app.post("/login", function(request, response) {

    var email = request.body.email;
    var password = request.body.password;
    if (email == "" || password == "") {
        if (email == "" && password == "") {
            response.send({
                "status": false,
                "message": "both fields are empty"
            })
            return;
        }
        if (email == "") {
            response.send({
                "status": false,
                "message": "email field empty"
            })
            return;
        } else {
            response.send({
                "status": false,
                "message": "password field empty"
            })
            return;
        }

    } else if (email == undefined || password == undefined) {
        if (email == undefined || password == undefined) {
              response.send({
                  "status": false,
                  "message": "both fields are undefined"
              })
              return;
          }
        if (email == undefined) {
            response.send({
                "status": false,
                "message": "email field undefined"
            })
        } else {
            response.send({
                "status": false,
                "message": "password field undefined"
            })
        }
        return;
    }

    request.checkBody("email", "Enter a valid email address.").isEmail();
    request.checkBody("password", "Enter a valid password").optional().matches(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z]*[A-Z])(?=.*[@#$%&_]).*$/);
    var errors = request.validationErrors();
    console.log(errors);
    if (errors) {
        response.send(errors);
        return;
    }

    ref.orderByChild("email").equalTo(email).once("value", function(data) {
        console.log(data.val());
        if (data.val() !== null) {
            data.forEach(function(snap) {
                var temp = snap.val();
                if (temp.password == password) {
                    console.log("you are online");
                    response.send({
                        "status": true,
                        "message": "you are online"
                    });
                } else {
                    response.send({
                        "status": false,
                        "message": "Invalid password"
                    });
                }
            });
        } else {
            response.send({
                "status": false,
                "message": "Invalid emailName"
            });
        }
        // console.log(temp);
    });

});

app.post("/signup", function(request, response) {
    // request.body Post Call  use to Bind Body Data
    var email = request.body.email;
    var password = request.body.password;

    request.checkBody("email", "Enter a valid email address.").isEmail();
    request.checkBody("password", "Enter a valid password").optional().matches(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z]*[A-Z])(?=.*[@#$%&_]).*$/);
    request.checkBody('user_name', '4 to 20 characters required').len(4, 20);
    request.checkBody('phone_no', ' 10 characters required').len(2, 10);
    var errors = request.validationErrors();
    console.log(errors);
    if (errors) {
        response.send(errors);
        return;
    }
    var ad = request.body;
    ref.push().setWithPriority(ad, 0 - Date.now());
    ref.once("value", function(data) {
        console.log("signup completed");
        response.send({
            "status": true,
            "message": "registration Successfull"
        });
    });

});

var server = app.listen(port, function() {
    console.log("server port %d has started", port);
})
