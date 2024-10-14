{
    var tasks_1 = [
        {
            content: "implement ts to the app",
            done: false,
        },
    ];
    var hideDoneTasks_1;
    var render_1 = function () {
        renderTasks_1();
    };
    var renderTasks_1 = function () {
        var htmlTaskListContent = "";
        for (var _i = 0, tasks_2 = tasks_1; _i < tasks_2.length; _i++) {
            var task = tasks_2[_i];
            htmlTaskListContent += "\n      <li class=\"taskList__task ".concat(task.done && hideDoneTasks_1 === true ? "taskList__task--hide" : "", "\">\n      <button class=\"js-done\">").concat(task.done ? "✔" : "", " </button>\n      <span class=\"").concat(task.done ? "taskList__task--lineTrough" : "", "\"> ").concat(task.content, "</span>\n      <button class=\"js-remove\">\uD83D\uDDD1</button>\n      </li>\n    ");
        }
        document.querySelector(".js-tasks").innerHTML = htmlTaskListContent;
    };
    var init = function () {
        var formSubmitButton = document.querySelector("js-submitButton");
        formSubmitButton === null || formSubmitButton === void 0 ? void 0 : formSubmitButton.addEventListener("click", function () { });
        render_1();
    };
    init();
}
