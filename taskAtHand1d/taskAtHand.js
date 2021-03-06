"use strict";

// using a function contructor form to create an object
function TaskAtHandApp()
{
	var version = "v1.4",
		appStorage = new AppStorage("taskAtHand");

	function saveTaskList() {
		var tasks = [];
		$("#task-list .task span.task-name").each(function() {
			tasks.push($(this).text())
		});
		appStorage.setValue("taskList", tasks);
	}

	function saveTaskListBackup() {
		var tasksBackup = [];
		$("#task-list .task span.task-name").each(function() {
			tasksBackup.push($(this).text())
		});
		appStorage.setValue("taskListBack", tasksBackup);
		appStorage.setValue("taskList", tasksBackup);
	}

	function onClickUndo() {
		appStorage.setValue("taskList", appStorage.getValue("taskListBack"));
		window.location.reload();
	}

	// creating a private function
	function setStatus(message)
	{
		$("#app>footer").text(message);
	}

	function addTask(){
		var taskName = $("#new-task-name").val();
		saveTaskListBackup();
		if (taskName)
		{
			addTaskElement(taskName);
			//Reset the text field
			$("#new-task-name").val("").focus();
		}
		saveTaskList();
	}
	function addTaskElement(taskName) {
		var $task = $("#task-template .task").clone();
		$("span.task-name", $task).text(taskName);

		$("#task-list").append($task);

		$("button.undo").click(function() {
			//removeAll($task);
			onClickUndo();
		});

		$("button.delete", $task).click(function() {
			removeTask($task);
		});
		$("button.move-up", $task).click(function() {
			moveTask($task, true);
		});
		$("button.move-down", $task).click(function() {
			moveTask($task, false);
		});
		// $("button.delete", $task).click(function() {
		// 	$task.remove();
		// });
		// $("button.move-up", $task).click(function() {
		// 	$task.insertBefore($task.prev());
		// });
		// $("button.move-down", $task).click(function() {
		// 	$task.insertAfter($task.next());
		// });
		$("span.task-name", $task).click(function() {
			onEditTaskName($(this));
		});
		$("input.task-name", $task).change(function() {
			onChangeTaskName($(this));
		})
		.blur(function() {
			$(this).hide().siblings("span.task-name").show();
		});
	}

	function removeTask($task) {
		$task.remove();
		saveTaskList();
	}

	function moveTask($task, moveUp) {
		if (moveUp) {
			$task.insertBefore($task.prev());
		}
		else {
			$task.insertAfter($task.next());
		}
		saveTaskList();
	}

	function onEditTaskName($span) {
		$span.hide()
			.siblings("input.task-name")
			.val($span.text())
			.show()
			.focus();
	}
	function onChangeTaskName($input) {
		$input.hide();
		var $span = $input.siblings("span.task-name");
		if ($input.val())
		{
			$span.text($input.val());
		}
		$span.show();
	}

	function loadTaskList() {
		var tasks = appStorage.getValue("taskList");
		if (tasks){
			for (var i in tasks) {
				addTaskElement(tasks[i]);
			}
		}
	}
	// creating a public function
	this.start = function()
	{
		$("#new-task-name").keypress(function(e) {
			if (e.which == 13) //Enter key
			{
				addTask();
				return false;
			}
		})
		.focus();

		$("#app>header").append(version);
		loadTaskList();
		setStatus("ready");
	};
} // end MyApp

/* 	JQuery's shorthand for the document ready event handler
		could be written: $(document).ready(handler);

		When this page loads, we'll create a global variable
		named "app" by attaching it to the "window" object
		(part of the BOM - Browser Object Model)
*/
$(function() {
	window.app = new TaskAtHandApp();
	window.app.start();
});
