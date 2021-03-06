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
    $("#radio-demo").get(0).reset();
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
      $(".winnerout").text("*******Player 1 Wins!*******");
      $("#radio-demo").hide();
      var count1 = parseInt($(".gcount1").text()) + 1;
      $(".gcount1").text(count1);
    } else if (score1 < score2) {
      $(".winnerout").text("*******Player 2 Wins!*******");
      $("#radio-demo").hide();
      var count2 = parseInt($(".gcount2").text()) + 1;
      $(".gcount2").text(count2);
    } else if (score1 == score2) {
      $(".winnerout").text("It's a TIE!");
      $("#radio-demo").hide();
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
    //making 3 ajax calles, one being the delivered question, the last two used for multiple choice answers
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
      var ans = data[0].answer;
      ans.replace(/<i>/, "");
      //when making ajax call, the answer posted back sometimes has format issues,
      //this takes care of the issue
      if (ans.includes("<i>") == true){
        var newans = ans.replace(/<i>|<\/i>/gi, "");
        $('#' + randomIndex ).text(newans);
        $("#answer").text(newans).hide();
      } else {
      $('#' + randomIndex ).text(data[0].answer);
      $("#answer").text(data[0].answer).hide();
      }
  }

  function appendWrongs(wrong) {
    //once answer has been appended in random spot,
    //the wrong answers get appended in the free spots left
    var ans = wrong[0].answer;
    if ($("#1").text() == "") {
      if (ans.includes("<i>") == true){
          var newans = ans.replace(/<i>|<\/i>/gi, "");
        $('#1').text(newans);
      } else {
      $('#1').text(wrong[0].answer);
      }
    } else if ($("#2").text() == "") {
      if (ans.includes("<i>") == true){
          var newans = ans.replace(/<i>|<\/i>/gi, "");
        $('#2').text(newans);
      } else {
      $('#2').text(wrong[0].answer);
      }
    } else {
      if (ans.includes("<i>") == true){
          var newans = ans.replace(/<i>|<\/i>/gi, "");
        $('#3').text(newans);
      } else {
      $('#3').text(wrong[0].answer);
      }
    }

  }

  function chooseTurn() {
    //takes modulus of question count to determind player turn
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
    //makes sure a radio button has been checked then determines if the answer was right
    if ($('.rad').is(':checked')) {
      if ($("#first-choice").is(':checked') && $("#1").text() == $("#answer").text()) {
        $("#answer").text("CORRECT! The answer is " + $("#answer").text());
        if ( value % 2 == 0) {
          incrementScore2();
        } else {
          incrementScore1();
        }
      } else if ($("#second-choice").is(':checked') && $("#2").text() == $("#answer").text()) {
        $("#answer").text("CORRECT! The answer is " + $("#answer").text());
        if ( value % 2 == 0) {
          incrementScore2();
        } else {
          incrementScore1();
        }
      } else if ($("#third-choice").is(':checked') && $("#3").text() == $("#answer").text()) {
        $("#answer").text("CORRECT! The answer is " + $("#answer").text());
        if ( value % 2 == 0) {
          incrementScore2();
        } else {
          incrementScore1();
        }
      }  else {
        $("#answer").text("INCORRECT! The answer was " + $("#answer").text());
        $("#getquest").prop('disabled', false);
        $("#submit").prop('disabled', true);
        $("#answer").animate({ height: 'toggle' });
        $("#hidden").animate({ height: 'toggle' });
      }
    } else {
      alert("Please choose an answer!");
    }
  }

  function incrementScore1() {
    //increments game score
    var count1 = parseInt($(".scount1").text());
    count1 = count1 + 1;
    $(".scount1").text(count1);
    $("#submit").prop('disabled', true);
    $("#getquest").prop('disabled', false);
    $("#answer").animate({ height: 'toggle' });
    $("#hidden").animate({ height: 'toggle' });
  }

  function incrementScore2() {
    //increments game score
    var count2 = parseInt($(".scount2").text());
    count2 = count2 + 1;
    $(".scount2").text(count2);
    $("#submit").prop('disabled', true);
    $("#getquest").prop('disabled', false);
    $("#answer").animate({ height: 'toggle' });
    $("#hidden").animate({ height: 'toggle' });
  }

  this.start = function() {
    $("#radio-demo").hide();
    $("#hidden").hide();
    $("#question").hide();
    playSong();
    appendFooter("Jeopardy Game Version 1.3 By Kevin Booth");
    //making ajax call
    $("#getquest").click(function() {
      var count = parseInt($(".count").text());
    if (count == 10) {
    } else {
      $(".winnerout").text("");
      resetNextQuestion();
      chooseTurn();
      getData();
      nextGame();
      $("#question").show();
      $("#radio-demo").show();
    }
    $("#input").val("");
    });
    //on click show answer etc..
    $("#submit").click(function() {
      validateAnswer();
    });
    //on click new game button
    $("#newgame").click(function() {
      if (parseInt($(".count").text()) == 10)  {
        resetNextGame();
        $("#getquest").prop('disabled', false);
      } else {
        alert("You need to finish this game first!");
      }
    });
  };

} // end jeopardyApp

$(function() {
	window.app = new JeopardyApp();
	window.app.start();
});
