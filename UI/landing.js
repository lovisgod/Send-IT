
function dropdownContent1() {
    var el1 = document.getElementById("dropcontent-1")
    
    if(el1.style.display == 'block') {
        el1.style.display = 'none'
    } else {
        el1.style.display = 'block'
    }
}

function accountdropdown(){
    var el2 = document.getElementById("dropcontent-2")
    if(el2.style.display == 'block') {
        el2.style.display = 'none'
    } else {
        el2.style.display = 'block'
    }
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(e) {
    if (!e.target.matches('.nav_deliver')) {
      var el1 = document.getElementById("dropcontent-1");
      if(el1.style.display == 'block') {
        el1.style.display = 'none'
    } 
    
    }
    if (!e.target.matches('.nav_account')) {
        var el1 = document.getElementById("dropcontent-2");
        if(el1.style.display == 'block') {
          el1.style.display = 'none'
      } 
      
      }
  }

  function pay(){
      window.location.href="./order_details.html";
      
  }

  function cancel_order(){
      window.location.replace("./landing.html");
  }
  function history(){
      window.location.replace("./order_history.html");
  }
  
