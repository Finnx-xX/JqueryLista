$(document).ready(function() {
  let removedItems = [];         // to store detached items
  var timer = 150;            // czas do sprawdzenia stanu boolean
 
  $(".dodajOdKonca").click(function(){
    if($(".text").val().trim()!="") {
      let text = $(".text").val();
      $(".container").append($("<li class='list-group-item'>" + text + "</li>").hide().fadeIn(400));
      $(".text").val("");
    } else {
      alert("Nic nie napisales!");
    }
  });
 
  $(".dodajOdPoczatku").click(function(){
    if($(".text").val().trim()!="") {
      let text = $(".text").val();
      $(".container").prepend($("<li class='list-group-item'>" + text + "</li>").hide().fadeIn(400));
      $(".text").val("");
    } else {
      alert("Nic nie napisales!");
    }
  });

  // Kliknięcie w element listy → edycja
  $(".container").on("dblclick", ".list-group-item", function(){
    let currentText = $(this).text();
    $(this).replaceWith('<input type="text" class="editable" value="' + currentText + '">');
    $(".editable").focus();
  });

  // Zapis po Enter
  $(".container").on("keydown", ".editable", function(e){
    if(e.key === "Enter"){
      let newText = $(this).val();
      $(this).replaceWith("<li class='list-group-item'>" + newText + "</li>");
    }
  });

  
  setInterval(przywrocBtn, timer);
  setInterval(usunBtn, timer);

  $(".usun_pierwszy").click(function(){
    const firstItem = $(".container .list-group-item:first");
     if (firstItem.length == 0) return;
     firstItem.fadeOut(400, function(){
      removedItems.push($(this).detach());
     });
  });

  $(".usun_ostatni").click(function(){
    const lastItem = $(".container .list-group-item:last");
     if (lastItem.length == 0) return;
     lastItem.fadeOut(400, function(){   // restoring doesnt work because of the fadeOut
      removedItems.push($(this).detach());
     });
  });
  

  $(".usun_liste").click(function(){
    const allItems = $(".container .list-group-item");
    if (allItems.length == 0) return;
    allItems.each(function() {
      $(this).fadeOut(400, function(){
        removedItems.push($(this).detach());
      });
    });
  });
 
 function przywrocBtn(){
  
  if(removedItems.length == 0){
    $(".przywrocBtn").css("background-color","gray");
    $(".przywrocBtn").css("color","rgb(224, 221, 221)");
  } else{
    $(".przywrocBtn").css("background-color","white");
    $(".przywrocBtn").css("color","black");
  }
};
function usunBtn(){
  var kontener = $(".container");
  if(kontener.children().length == 0){
    $(".usunBtn").css("background-color","gray");
    $(".usunBtn").css("color","rgb(224, 221, 221)");
  } else{
    $(".usunBtn").css("background-color","white");
    $(".usunBtn").css("color","black");
  }
};

  $(".przywroc_liste").click(function(){
    if (removedItems.length == 0) return;            // do nothing if nothing is removed
    const allRemoved = removedItems.slice();        // get all removed item
    removedItems.splice(0, removedItems.length);   // remove them from the array
    allRemoved.forEach(function(allRemoved){                 // put them back in the list
      allRemoved.hide().appendTo(".container").fadeIn(400);
    });         
  });

  $(".przywroc_produkt_listy").click(function(){
    if (removedItems.length == 0) return;       // do nothing if nothing is removed
    const firstRemoved = removedItems[0];      // get the first removed item
    removedItems.splice(0, 1);                // remove it from the array
    firstRemoved.hide().appendTo(".container").fadeIn(400);    // put it back in the list
  });
  // Even = kolorowanie co drugi
  $(".color-even").click(function(){
    const even = $(".container .list-group-item:even");
    even.css('background-color','lightblue');
  });
  // Wyzeruj kolory
  $(".empty-color").click(function(){
    const empty = $(".container .list-group-item");
    empty.css('background-color','white');
  });
  // class active
  $(".container").on("click", ".list-group-item", function(){
    
    $(this).toggleClass("active");
  });
  // Sortowanie alfabetyczne
  $(".ustaw_A-Z").click(function(){
    var allItems = $(".container .list-group-item").get();
    if (allItems.length == 0) return;
    allItems.sort(function(a, b) {
      var textA = $(a).text().toLowerCase();
      var textB = $(b).text().toLowerCase();
      return textA.localeCompare(textB);
    });
    // Posortowane i gotowe do przesłania
    $.each(allItems, function(index, item_li) {
      $(".container").append(item_li);
    });
  });
  // Filtrowanie elementów, czyli wyszukiwanie ich w liście
  $("#searchBtn").click(function() {
    var input = $("#search").val().toLowerCase();
    $(".container li").each(function() {
      var text = $(this).text().toLowerCase();
      if (text.includes(input)) {
        $(this).css("background-color","red");
      } else {
        $(this).hide();
      }
    });
  });
});