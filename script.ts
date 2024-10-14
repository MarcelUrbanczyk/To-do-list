{
  interface task {
    content: string;
    done: boolean;
  }

  let tasks: task[] = [
    {
      content: "implement ts to the app",
      done: false,
    },
  ];

  let hideDoneTasks: boolean = false;

  const addNewTask = (taskContent: string) => {
    tasks = [...tasks, { content: taskContent, done: false }];

    render();
  };

  const removeTask = (taskIndex: number) => {
    tasks = [...tasks.filter((task, index) => taskIndex !== index)];

    render();
  };

  const toggleTaskDone = (taskIndex: number) => {
    tasks = [
      ...tasks.map((task, index) =>
        taskIndex === index ? { ...task, done: !task.done } : task
      ),
    ];

    render();
  };

  const markAllTasksDone = () => {
    const markAllTasksDoneButton = document.querySelector(
      ".js-markAllDone"
    ) as HTMLElement;

    const isAnyUndone = tasks.some((task) => !task.done);

    markAllTasksDoneButton && isAnyUndone
      ? markAllTasksDoneButton.addEventListener("click", () => {
          tasks = [...tasks.map((task) => ({ ...task, done: true }))];
          render();
        })
      : "";
  };

  const toggleHideDone = () => {
    const hideDoneTasksButton = document.querySelector(".js-toggleHideDone");
    const isAnyDone = tasks.some((task) => task.done);
    hideDoneTasksButton && isAnyDone
      ? hideDoneTasksButton.addEventListener("click", () => {
          hideDoneTasks = !hideDoneTasks;
          render();
        })
      : "";
  };

  const bindRemoveButtons = () => {
    const removeButtons = document.querySelectorAll(".js-remove");
    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });
  };

  const bindDoneButtons = () => {
    const doneButtons = document.querySelectorAll(".js-done");
    doneButtons.forEach((doneButton, index) => {
      doneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const renderTasks = () => {
    let htmlTaskListContent = "";
    const TaskList = document.querySelector(".js-tasks") as HTMLElement;
    for (const task of tasks) {
      htmlTaskListContent += `
      <li class="taskList__task ${
        task.done && hideDoneTasks === true ? "taskList__task--hide" : ""
      }">
      <button class="js-done">${task.done ? "✔" : ""} </button>
      <span class="${task.done ? "taskList__task--lineTrough" : ""}"> ${
        task.content
      }</span>
      <button class="js-remove">🗑</button>
      </li>
    `;
    }

    TaskList.innerHTML = htmlTaskListContent;
  };

  const renderButtons = () => {
    let htmlTaskListHeaderContent = "";
    const TaskListHeader = document.querySelector(".js-header") as HTMLElement;

    const isAnyUndone = tasks.some((task) => !task.done);

    htmlTaskListHeaderContent +=
      tasks.length > 0
        ? `
    <h2 class="taskList__headerText">Task list</h2>
    ${
      hideDoneTasks === false
        ? `<button class="taskListHeader__button js-toggleHideDone">
          Hide done tasks </button>`
        : ``
    }
    ${
      hideDoneTasks === true
        ? `<button class="taskListHeader__button js-toggleHideDone">
          Show done tasks </button>`
        : ``
    }
    <button class="taskListHeader__button js-markAllDone" ${
      isAnyUndone === false ? "disabled" : ""
    }>
    Mark all done
    </button>
    `
        : `
    <h2 class="taskList__headerText">Task list</h2>
     `;

    TaskListHeader.innerHTML = htmlTaskListHeaderContent;
  };

  const render = () => {
    renderTasks();
    renderButtons();

    markAllTasksDone();
    toggleHideDone();

    bindRemoveButtons();
    bindDoneButtons();
  };

  const handleFormSubmit = () => {
    const newTaskInput = document.querySelector(
      ".js-newTask"
    ) as HTMLInputElement;

    let newTaskContent = newTaskInput.value.trim();

    newTaskContent ? addNewTask(newTaskContent) : "";
    newTaskInput.value = "";
    newTaskInput.focus();
  };

  const init = () => {
    const formSubmitButton = document.querySelector(
      ".js-submitButton"
    ) as HTMLInputElement;

    formSubmitButton.addEventListener("click", handleFormSubmit);

    render();
  };

  init();
}
