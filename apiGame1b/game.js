"use strict";

function JeopardyApp() {

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
  }

  function appendData(data) {
      $(".titles").text(data[0].category.title);
      $(".diffi").text(data[0].value);
      $("#question").text(data[0].question);
      $("#answer").text(data[0].answer).hide();
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
