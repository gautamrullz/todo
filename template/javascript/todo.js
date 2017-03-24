var detail = {};
$(document).ready(function() {
  if (sessionStorage.getItem("email") !== null) {
      // console.log(sessionStorage.getItem('email'));
      // event.preventDefault();
      callPage();
      return;
  }
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
    // $("#logout").click(function() {
    //   // console.log("asddd");
    //   sessionStorage.removeItem("email");
    //   return;
    // });
    // function checkSession() {

    // }
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
        var list_detail = {};
        list_detail["user_name"] = user_name;
        list_detail["gender"] = gender;
        list_detail["password"] = pass;
        list_detail["phone_no"] = "+91-" + phone_no;
        // console.log(detail);
        try {

            if (user_name.length < 4) {
                throw 'Re-Enter User Name "too Short"';
            } else if (!checkPassword(pass)) {
                throw "week password special char allowed @ # $ % & _";
            } else if (!checkPhoneNo(phone_no)) {
                throw "invalid phone no...!!!";
            } else if (pass == rpass) {
                if (localStorage.getItem("detail") == null) {
                    console.log("null");
                    detail[email] = list_detail;
                    if (typeof(Storage) !== "undefined") {
                        localStorage.setItem('detail', JSON.stringify(detail));
                        // alert("thanks for Sign Up");
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
                    var detail = JSON.parse(detail);
                    detail[email] = list_detail;
                    if (typeof(Storage) !== "undefined") {
                        localStorage.setItem('detail', JSON.stringify(detail));
                        // alert("thanks for Sign Up");
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
        var detail = localStorage.getItem("detail");
        var list_detail = JSON.parse(detail);
        console.log(list_detail);
        // console.log(dont);
        try {
            //checking the local storage is null or not
            if (list_detail == null) {
                throw "please Sign Up";
            }
            //matching email in json
            if (list_detail.hasOwnProperty(email)) {
                //matching password
                if (pwd == list_detail[email]["password"]) {
                    console.log(list_detail[email]);
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
        var regex = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z]*[A-Z])(?=.*[@#$%&_]).*$/;
        return regex.test(pass);
    }
    var checkPhoneNo = function(phone_no) {
        var regex = /^([7-9]{1}[0-9]{9})$/;
        return regex.test(phone_no);
    }

});
