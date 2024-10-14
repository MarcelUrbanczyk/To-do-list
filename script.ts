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

  const render = () => {
    renderTasks();
  };

  const renderTasks = () => {
    let htmlTaskListContent = "";

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

    document.querySelector(".js-tasks")!.innerHTML = htmlTaskListContent;
  };

  const init = () => {
    const formSubmitButton = document.querySelector("js-submitButton");

    formSubmitButton?.addEventListener("click", () => {});

    render();
  };

  init();
}
