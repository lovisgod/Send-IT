$(".signup-form").hide();
$(".signup").css("background", "grey");
$(".reset-form").hide();

$(".login").click(function(){
    $(".signup-form").hide();
    $(".login-form").show();
    $(".signup").css("background", "grey");
    $(".login").css("background", "#CBE173");
  });
  
  
  $(".signup").click(function(){
    $(".signup-form").show();
    $(".login-form").hide();
    $(".login").css("background", "grey");
    $(".signup").css("background", "#CBE173");
  });

  $("#reset-button").click(function(){
      $(".signup-form").hide();
      $(".login-form").hide();
      $(".reset-form").show();
      $(".login").hide();
      $(".signup").hide();
  })

  $(".change_destination").click(function(){
    window.location.href="./change_destination.html";
  });

  $(".cancel_the_order").click(function(){
    window.location.replace("../index.html");
  });

  $(".card").click(function(){
    window.location.href="./order_details.html";
  });

  $(".admin_card").click(function(){
    window.location.href="./admin_order_details.html";
  });

  $(".btn").click(function(){
    window.location.href="./order_history.html";
  });

  $(".btn_admin").click(function(){
    window.location.href="./admin_profile.html";
  }); 