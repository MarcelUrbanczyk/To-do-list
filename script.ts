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

  let hideDoneTasks: boolean;

  const addNewTask = (taskContent) => {
    tasks = [...tasks, { content: taskContent, done: false }];

    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [
      ...tasks.filter((index) => {
        index !== taskIndex;
      }),
    ];

    render();
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

  const render = () => {
    renderTasks();
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
