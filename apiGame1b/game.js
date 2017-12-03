"use strict";

function JeopardyApp() {

  function validateLength() {

  }

  function nextGame() {
    var count = parseInt($(".count").text());
    count = count + 1;
    $(".count").text(count);
  }
  function getData() {
    $("#answer").val("");
    var answer;
     $.ajax({
      type: "GET",
      url: "http://jservice.io/api/random",
      dataType: "json"
      })
      .done(function(data) { appendData(data); })
      .fail(function(jqXHR, textStatus, errorThrown) {
  					showError(errorThrown);
      });

    $.ajax({
     type: "GET",
     url: "http://jservice.io/api/random",
     dataType: "json"
     })
     .done(function(wrong1) { appendWrongs(wrong1); })
     .fail(function(jqXHR, textStatus, errorThrown) {
           showError(errorThrown);
     });

   $.ajax({
    type: "GET",
    url: "http://jservice.io/api/random",
    dataType: "json"
    })
    .done(function(wrong2) { appendWrongs(wrong2); })
    .fail(function(jqXHR, textStatus, errorThrown) {
          showError(errorThrown);
    });
  }

  function appendData(data) {
      var labels = ["#one", "#two", "#three"];
      $(".titles").text(data[0].category.title);
      $(".diffi").text(data[0].value);
      $("#question").text(data[0].question);
      //randomly placing answer in HTML
      var randomIndex = (Math.floor(Math.random() * 3)) + 1;
      console.log(randomIndex)
      $('#' + randomIndex ).text(data[0].answer);

      $("#answer").text(data[0].answer).hide();
  }

  function appendWrongs(wrong) {
    //once answer has been appended in random spot,
    //the wrong answers get appended in the free spots left
    if ($("#1").text() == "") {
      $("#1").text(wrong[0].answer);
    } else if ($("#2").text() == "") {
      $("#2").text(wrong[0].answer);
    } else {
      $("#3").text(wrong[0].answer);
    }

  }

  function chooseTurn() {
    var value = parseInt($(".count").text());
    if ( value % 2 == 0) {
      $(".ans").text("Player 1, Answer the question: ");
    } else {
      $(".ans").text("Player 2, Answer the question: ");
    }
  }

  function appendFooter(message) {
    $("footer").text(message)
  }

  function validateAnswer(number) {
    if (number = 1) {
      var count = parseInt($("#score").text());
      count = count + 1;
      $("#score").text(count);
    }
  }

  this.start = function() {
    $("#hidden").hide();

    appendFooter("Jeopardy Game Version 1.3");
    //making ajax call
    $("#getquest").click(function() {
      var count = parseInt($(".count").text());
    if (count == 10) {
      $(".winnerout").text("Someone wins");
    } else {
      $("label").text("");
      chooseTurn();
      getData();
      nextGame();
    }
    $("#input").val("");
    });
    //on click show answer etc..
    $("#submit").click(function() {
      $("#answer").show();
      $("#hidden").show();
    });
    //incrementing the count of score
    $("#yes").click(function() {
      validateAnswer(1);
      $("#hidden").hide();
    });
    //hiding bottom area for next question
    $("#no").click(function() {
      $("#hidden").hide();
    });
  };

} // end jeopardyApp

$(function() {
	window.app = new JeopardyApp();
	window.app.start();
});
