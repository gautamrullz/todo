var detail = {};

$(document).ready(function() {
    // $.ajax();
    // checkSession();

    function callPage() {
        $.ajax({
            url: "home.html",
            type: "GET",
            dataType: "html",
            success: function(response) {
                // console.log('the page was loaded', response);
                $('body').html(response);
            },
            error: function(error) {
                console.log('the page was NOT loaded', error);
            },
            complete: function(xhr, status) {
                console.log("the request is complete!");
            }
        })
    }
    $("#logout").click(function() {
      // console.log("asddd");
      sessionStorage.removeItem("email");
      return;
    });


    // function checkSession() {
    // if (sessionStorage.getItem("email") !== null) {
    //     // console.log(sessionStorage.getItem('email'));
    //     // event.preventDefault();
    //     callPage();
    //     return;
    // }
        // }
        // checkSession();
        //  $('input').on('click', function(e){
        //     e.preventDefault( );
        //     var pageRef = $(this).attr('href');
        //
        //     callPage(pageRef)
        //
        // });
        $("#signup").click(function() {
            $("#loginForm").css({
                "display": "none"
            });
            $("#signupForm").css({
                "display": "block"
            });
        });

        $("#back").click(function() {
            $("#signupForm").css({
                "display": "none"
            });
            $("#loginForm").css({
                "display": "block"
            });
        });

        $("#logout").click(function() {
          // console.log("asddd");
          sessionStorage.removeItem("email");
          return;
        });

        $("#signupForm").submit(function(event) {
            var user_name = $("#user_name").val();
            var email = $("#email").val();
            var gender = $("input:radio:checked").val();
            var phone_no = $("#pno").val();
            var pass = $("#pwd").val();
            var rpass = $("#rpwd").val();
            var list = {};
            list["user_name"] = user_name;
            list["gender"] = gender;
            list["password"] = pass;
            list["phone_no"] = phone_no;
            console.log(detail);
            try {
                if (user_name.length < 4) {
                    throw 'Re-Enter User Name "too Short"';
                } else if (!checkPassword(pass)) {
                    throw "password between 5-10 and special char @ _ # * ";
                } else if (pass == rpass) {
                    if (localStorage.getItem("detail") == null) {
                        console.log("null");
                        detail[email] = list;
                        if (typeof(Storage) !== "undefined") {
                            localStorage.setItem('detail', JSON.stringify(detail));
                            alert("thanks for Sign Up");
                            event.preventDefault();
                            sessionStorage.removeItem("email");
                            sessionStorage.setItem("email", email);
                            callPage();
                            return;
                        } else {
                            throw "localStorage not found";
                        }
                    } else {
                        detail = localStorage.getItem("detail");
                        var dont = JSON.parse(detail);
                        dont[email] = list;
                        if (typeof(Storage) !== "undefined") {
                            localStorage.setItem('detail', JSON.stringify(dont));
                            alert("thanks for Sign Up");
                            event.preventDefault();
                            sessionStorage.removeItem("email");
                            sessionStorage.setItem("email", email);
                            callPage();
                            return;
                        } else {
                            throw "localStorage not found";
                        }
                    }
                } else {

                    throw "password miss match...!!! Re-Enter password";
                }
            } catch (error) {
                alert(error);
            }
            event.preventDefault();
        });

        $("#loginForm").submit(function(event) {
            var email = $("#checkemail").val();
            var pwd = $("#checkpwd").val();
            // try {
            //     if (!checkEmail(email)) {
            //         throw "incorrect email...!!!";
            //         event.preventDefault();
            //     }
            // } catch (e) {
            //     alert(e);
            //     return;
            // }

            //geting stored data from localStorage
            var check = localStorage.getItem("detail");
            var dont = JSON.parse(check);
            console.log(dont);
            // console.log(dont);
            try {
                //checking the local storage is null or not
                if (dont == null) {
                    throw "please Sign Up";
                }
                //matching email in json
                if (dont.hasOwnProperty(email)) {
                    //matching password
                    if (pwd == dont[email]["password"]) {
                        console.log(dont[email]);
                        event.preventDefault();
                        // if(typeof(Storage) !== "undefined") {
                        sessionStorage.setItem("email", email);
                        // }
                        //calling $.ajax() method to link to another page(home page)
                        callPage();
                        return;
                    } else {
                        throw "password incorrect";
                    }
                } else {
                    throw "email not registered";
                }
            } catch (e) {
                alert(e);
                // return;
            }
            event.preventDefault();
        });
        // var checkEmail = function(email) {
        //   var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        //   return regex.test(email);
        // }
        var checkPassword = function(pass) {
            var regex = /^([a-zA-Z0-9@*#_]{5,10})$/;
            return regex.test(pass);
        }

});
