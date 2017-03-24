$(document).ready(function(){
  $("#logout").click(function() {
    // console.log("asddd");
    sessionStorage.removeItem("email");
    location.reload();
    return;
  });

});
