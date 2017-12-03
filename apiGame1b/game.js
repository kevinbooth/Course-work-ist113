"use strict";

function JeopardyApp() {

  function playSong() {
    var obj = document.createElement("audio");
    obj.src="themesong.mp3";
    obj.volume=0.10;
    obj.autoPlay=false;
    obj.preLoad=true;

    obj.play();
  }

  function resetNextQuestion() {
    //resetting fields, disabling submit button
    $("#submit").prop('disabled', false);
    $("label").text("");
    $("input").attr(':checked', false);
    $("#getquest").prop('disabled', true);
  }

  function resetNextGame() {
    validateWinner();

    $(".scount1").text("0");
    $(".scount2").text("0");
    $(".count").text("0");
    $(".titles").text("");
    $(".diffi").text("");
    $("#question").text("");
    $("#answer").text("");
    $("#submit").prop('disabled', false);
    $("label").text("");
    $("input").attr(':checked', false);
  }

  function validateWinner() {
    var score1 = parseInt($(".scount1").text());
    var score2 = parseInt($(".scount2").text());

    if (score1 > score2) {
      alert("Player 1 wins");
      var count1 = parseInt($(".gcount1").text()) + 1;
      $(".gcount1").text(count);
    } else if (score1 < score2) {
      alert("Player 2 Wins");
      var count2 = parseInt($(".gcount2").text()) + 1;
      $(".gcount2").text(count2);
    } else if (score1 == score2) {
      alert("Tie!");
    } else {
      alert("Error");
    }
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

  function validateAnswer() {
    var value = parseInt($(".count").text());
    var count1 = parseInt($(".scount1").text());
    var count2 = parseInt($(".scount2").text())

    if ($('.rad').is(':checked')) {
      if ($("#first-choice").is(':checked') && $("#1").text() == $("#answer").text()) {
        $("#answer").text("CORRECT! The answer is " + $("#answer").text());
        if ( value % 2 == 0) {
          count2 = count2 + 1;
          $(".scount2").text(count2);
        } else {
          count1 = count1 + 1;
          $(".scount1").text(count1);
        }
      } else if ($("#second-choice").is(':checked') && $("#2").text() == $("#answer").text()) {
        $("#answer").text("CORRECT! The answer is " + $("#answer").text());
        if ( value % 2 == 0) {
          count2 = count2 + 1;
          $(".scount2").text(count2);
        } else {
          count1 = count1 + 1;
          $(".scount1").text(count1);
        }
      } else if ($("#third-choice").is(':checked') && $("#3").text() == $("#answer").text()) {
        $("#answer").text("CORRECT! The answer is " + $("#answer").text());
        if ( value % 2 == 0) {
          count2 = count2 + 1;
          $(".scount2").text(count2);
        } else {
          count1 = count1 + 1;
          $(".scount1").text(count1);
        }
      }  else {
        $("#answer").text("INCORRECT! The answer was " + $("#answer").text());
      }
    } else {
      alert("Please choose an answer!");
    }
  }

  this.start = function() {
    $("#hidden").hide();
    playSong();
    appendFooter("Jeopardy Game Version 1.3");
    //making ajax call
    $("#getquest").click(function() {
      var count = parseInt($(".count").text());
    if (count == 10) {
      $(".winnerout").text("Someone wins");
    } else {
      resetNextQuestion();
      chooseTurn();
      getData();
      nextGame();
    }
    $("#input").val("");
    });
    //on click show answer etc..
    $("#submit").click(function() {
      $(this).prop('disabled', true);
      $("#getquest").prop('disabled', false);
      validateAnswer();
      $("#answer").show();
      $("#hidden").show();
    });
    $("#newgame").click(function() {
      resetNextGame();
      $("#getquest").prop('disabled', false);
    });
  };

} // end jeopardyApp

$(function() {
	window.app = new JeopardyApp();
	window.app.start();
});
