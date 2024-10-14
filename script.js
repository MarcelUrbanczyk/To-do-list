var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
{
    var tasks_1 = [
        {
            content: "implement ts to the app",
            done: false,
        },
    ];
    var hideDoneTasks_1 = false;
    var addNewTask_1 = function (taskContent) {
        tasks_1 = __spreadArray(__spreadArray([], tasks_1, true), [{ content: taskContent, done: false }], false);
        render_1();
    };
    var removeTask_1 = function (taskIndex) {
        tasks_1 = __spreadArray([], tasks_1.filter(function (task, index) { return taskIndex !== index; }), true);
        render_1();
    };
    var toggleTaskDone_1 = function (taskIndex) {
        tasks_1 = __spreadArray([], tasks_1.map(function (task, index) {
            return taskIndex === index ? __assign(__assign({}, task), { done: !task.done }) : task;
        }), true);
        render_1();
    };
    var markAllTasksDone_1 = function () {
        var markAllTasksDoneButton = document.querySelector(".js-markAllDone");
        var isAnyUndone = tasks_1.some(function (task) { return !task.done; });
        markAllTasksDoneButton && isAnyUndone
            ? markAllTasksDoneButton.addEventListener("click", function () {
                tasks_1 = __spreadArray([], tasks_1.map(function (task) { return (__assign(__assign({}, task), { done: true })); }), true);
                render_1();
            })
            : "";
    };
    var toggleHideDone_1 = function () {
        var hideDoneTasksButton = document.querySelector(".js-toggleHideDone");
        var isAnyDone = tasks_1.some(function (task) { return task.done; });
        hideDoneTasksButton && isAnyDone
            ? hideDoneTasksButton.addEventListener("click", function () {
                hideDoneTasks_1 = !hideDoneTasks_1;
                render_1();
            })
            : "";
    };
    var bindRemoveButtons_1 = function () {
        var removeButtons = document.querySelectorAll(".js-remove");
        removeButtons.forEach(function (removeButton, index) {
            removeButton.addEventListener("click", function () {
                removeTask_1(index);
            });
        });
    };
    var bindDoneButtons_1 = function () {
        var doneButtons = document.querySelectorAll(".js-done");
        doneButtons.forEach(function (doneButton, index) {
            doneButton.addEventListener("click", function () {
                toggleTaskDone_1(index);
            });
        });
    };
    var renderTasks_1 = function () {
        var htmlTaskListContent = "";
        var TaskList = document.querySelector(".js-tasks");
        for (var _i = 0, tasks_2 = tasks_1; _i < tasks_2.length; _i++) {
            var task = tasks_2[_i];
            htmlTaskListContent += "\n      <li class=\"taskList__task ".concat(task.done && hideDoneTasks_1 === true ? "taskList__task--hide" : "", "\">\n      <button class=\"js-done\">").concat(task.done ? "✔" : "", " </button>\n      <span class=\"").concat(task.done ? "taskList__task--lineTrough" : "", "\"> ").concat(task.content, "</span>\n      <button class=\"js-remove\">\uD83D\uDDD1</button>\n      </li>\n    ");
        }
        TaskList.innerHTML = htmlTaskListContent;
    };
    var renderButtons_1 = function () {
        var htmlTaskListHeaderContent = "";
        var TaskListHeader = document.querySelector(".js-header");
        var isAnyUndone = tasks_1.some(function (task) { return !task.done; });
        htmlTaskListHeaderContent +=
            tasks_1.length > 0
                ? "\n    <h2 class=\"taskList__headerText\">Task list</h2>\n    ".concat(hideDoneTasks_1 === false
                    ? "<button class=\"taskListHeader__button js-toggleHideDone\">\n          Hide done tasks </button>"
                    : "", "\n    ").concat(hideDoneTasks_1 === true
                    ? "<button class=\"taskListHeader__button js-toggleHideDone\">\n          Show done tasks </button>"
                    : "", "\n    <button class=\"taskListHeader__button js-markAllDone\" ").concat(isAnyUndone === false ? "disabled" : "", ">\n    Mark all done\n    </button>\n    ")
                : "\n    <h2 class=\"taskList__headerText\">Task list</h2>\n     ";
        TaskListHeader.innerHTML = htmlTaskListHeaderContent;
    };
    var render_1 = function () {
        renderTasks_1();
        renderButtons_1();
        markAllTasksDone_1();
        toggleHideDone_1();
        bindRemoveButtons_1();
        bindDoneButtons_1();
    };
    var handleFormSubmit_1 = function () {
        var newTaskInput = document.querySelector(".js-newTask");
        var newTaskContent = newTaskInput.value.trim();
        newTaskContent ? addNewTask_1(newTaskContent) : "";
        newTaskInput.value = "";
        newTaskInput.focus();
    };
    var init = function () {
        var formSubmitButton = document.querySelector(".js-submitButton");
        formSubmitButton.addEventListener("click", handleFormSubmit_1);
        render_1();
    };
    init();
}
