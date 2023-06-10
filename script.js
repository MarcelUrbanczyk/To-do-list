{
  let tasks = [];
  let hideDoneTasks = false;

  const render = () => {
    renderTasks();
    renderButtons();

    markAllTasksDone();
    hideDoneTasksEvent();
    showDoneTasksEvent();

    bindDoneButtons();
    bindRemoveButtons();
  };

  const renderTasks = () => {
    let htmlString = "";
    for (const task of tasks) {
      htmlString += `
            <li class="taskList__task ${task.done && hideDoneTasks === true ? "taskList__task--hide" : ""}">
            <button class="js-done">${task.done ? "✔" : ""} </button>
            <span class="${task.done ? "taskList__task--lineTrough" : ""}"> ${task.content}</span>
            <button class="js-remove">🗑</button>
            </li>
            `;
    }
    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const renderButtons = () => {
    const taskListHeader = document.querySelector(".taskList__header");
    let htmlString = "";
    if (tasks != "") {
      const isAnyDone = tasks.some((task) => task.done === true);
      const isAnyUndone = tasks.some((task) => task.done === false);
      htmlString += `
        <h2 class="taskList__headerText">Task list</h2>
        ${
          hideDoneTasks === false
            ? 
            `<button class="taskListHeader__button js-hideDoneTasks">
              Hide done tasks </button>`
            : ``
        }
        ${
          hideDoneTasks === true
            ? `<button class="taskListHeader__button js-showDoneTasks">
              Show done tasks </button>`
            : ``
        }
        <button class="taskListHeader__button js-markAllDone" ${isAnyUndone === false ? "disabled" : ""}>
        Mark all done
        </button>
        `;

      taskListHeader.innerHTML = htmlString;
    } else {
      htmlString += `
      <h2 class="taskList__headerText">Task list</h2>
       `;
      taskListHeader.innerHTML = htmlString;
    }
  };

  const bindRemoveButtons = () => {
    const removeTaskButtons = document.querySelectorAll(".js-remove");
    removeTaskButtons.forEach((removeTaskButton, taskIndex) => {
      removeTaskButton.addEventListener("click", () => {
        removeTask(taskIndex);
      });
    });
  };

  const bindDoneButtons = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-done");
    toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(taskIndex);
      });
    });
  };

  const hideDoneTasksEvent = () => {
    const isAnyDone = tasks.some((task) => task.done === true);
    if (hideDoneTasks === false && isAnyDone === true) {
      let hideDoneTasksButton = document.querySelector(".js-hideDoneTasks");
      hideDoneTasksButton.addEventListener("click", () => {
        hideDoneTasks = true;
        render();
      });
    }
  };

  const showDoneTasksEvent = () => {
    const isAnyDone = tasks.some((task) => task.done === true);
    if (hideDoneTasks === true && isAnyDone === true) {
      let showDoneTasksButton = document.querySelector(".js-showDoneTasks");
      showDoneTasksButton.addEventListener("click", () => {
        hideDoneTasks = false;
        render();
      });
    }
  };

  const markAllTasksDone = () => {
    tasks = [...tasks];
    const isAnyUndone = tasks.some((task) => task.done === false);
    if (isAnyUndone === true) {
      const markAllDoneButton = document.querySelector(".js-markAllDone");
      markAllDoneButton.addEventListener("click", () => {
        tasks = tasks.map((task) => ({
          ...task,
          done: true,
        }));
        render();
      });
    }
  };

  const removeTask = (taskIndex) => {
    tasks = [...tasks.filter((task, index) => index !== taskIndex)];
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.map((task, index) =>
        index === taskIndex ? { ...task, done: !task.done } : task ),
    ];

    render();
  };

  const formSubmit = () => {
    const newTaskInput = document.querySelector(".js-newTask");
    const newTaskText = newTaskInput.value.trim();
    if (newTaskText !== "") addNewTask(newTaskText);
    newTaskInput.focus();
    newTaskInput.value = "";
  };

  const addNewTask = (newTaskText) => {
    tasks = [...tasks, { content: newTaskText, done: false }];
    render();
  };

  const init = () => {
    const formSubmitButton = document.querySelector(".js-submitButton");

    formSubmitButton.addEventListener("click", formSubmit);
    render();
  };

  init();
}
