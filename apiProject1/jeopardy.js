"use strict";

function JeopardyApp() {

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
      $("#title").text(data[0].category.title);
      $("#diff").text(data[0].value);
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
      $("#corr").hide();
      $("#yes").hide();
      $("#no").hide();
    }
  }

  this.start = function() {
    $("#corr").hide();
    $("#yes").hide();
    $("#no").hide();

    appendFooter("Jeopardy Game Version 1");
    $("#getquest").click(function() {
    getData();
    });
    $("#submit").click(function() {
      $("#answer").show();
      $("#corr").show();
      $("#yes").show();
      $("#no").show();
    });
    $("#yes").click(function() {
      validateAnswer(1);
    });
    $("#no").click(function() {
      $("#corr").hide();
      $("#yes").hide();
      $("#no").hide();
    });
  };

} // end jeopardyApp

$(function() {
	window.app = new JeopardyApp();
	window.app.start();
});
